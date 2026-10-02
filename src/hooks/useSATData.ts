import { useState, useEffect, useRef, useCallback } from 'react';
import type { Subcuenca, SATDashboardSummary } from '../types/sat';
import { POPAYAN_SUBCUENCAS_DATA } from '../data/subcuencasData';

const STORAGE_KEY = 'SAT_POPAYAN_SUBCUENCAS_CACHE_V1';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos

export function useSATData() {
  const [subcuencas, setSubcuencas] = useState<Subcuenca[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Cache corrupto, usar datos de respaldo
      }
    }
    return POPAYAN_SUBCUENCAS_DATA;
  });

  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('es-CO'));
  const [lastDataHash, setLastDataHash] = useState<string>('');
  const [hasNewData, setHasNewData] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Escuchar eventos de conectividad
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Generar un hash simple para detectar cambios en los datos
  const computeDataHash = useCallback((data: Subcuenca[]): string => {
    const summary = data.map(s => {
      const stationsSummary = s.stations.map(st =>
        `${st.id}:${st.waterLevelMeters}:${st.flowRateM3s}:${st.rainfallMm1h}:${st.rainfallMm24h}:${st.status}`
      ).join('|');
      return `${s.id}:${s.currentRisk}:${stationsSummary}`;
    }).join('||');
    // Hash simple para comparación rápida
    let hash = 0;
    for (let i = 0; i < summary.length; i++) {
      const char = summary.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(36);
  }, []);

  // Función para sincronizar datos con el Backend Proxy /api/telemetry
  const refreshData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/telemetry', {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000) // Timeout de 10 segundos
      });

      if (response.ok) {
        const result = await response.json();

        // Si la API retorna datos hidrológicos actualizados, procesarlos
        // En producción, aquí se mapearían los datos reales del IDEAM/CRC/IoT
        if (result.subcuencas && Array.isArray(result.subcuencas)) {
          const newHash = computeDataHash(result.subcuencas);
          if (newHash !== lastDataHash) {
            setSubcuencas(result.subcuencas);
            setLastDataHash(newHash);
            setHasNewData(true);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(result.subcuencas));
            // Resetear indicador de nuevos datos después de 5 segundos
            setTimeout(() => setHasNewData(false), 5000);
          }
        }

        setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
        setIsOffline(false);
      } else {
        console.warn('API Proxy: respuesta no exitosa. Usando cache local.');
      }
    } catch {
      console.warn('Sin conexión o error de red. Modo Offline activo.');
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, lastDataHash, computeDataHash]);

  // Auto-actualización cada 5 minutos
  useEffect(() => {
    // Intentar sincronizar al iniciar
    refreshData();

    // Configurar intervalo de 5 minutos
    intervalRef.current = setInterval(() => {
      if (navigator.onLine) {
        refreshData();
      }
    }, REFRESH_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guardar en cache local ante cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subcuencas));
  }, [subcuencas]);

  // Cálculo consolidado para el Dashboard
  const summary: SATDashboardSummary = {
    totalPopulationProtected: subcuencas.reduce((acc, curr) => acc + curr.exposedPopulation, 0),
    activeStations: subcuencas.reduce((acc, curr) => acc + curr.stations.length, 0),
    totalSubcuencas: subcuencas.length,
    highestRiskLevel: subcuencas.some((s) => s.currentRisk === 'rojo')
      ? 'rojo'
      : subcuencas.some((s) => s.currentRisk === 'naranja')
      ? 'naranja'
      : subcuencas.some((s) => s.currentRisk === 'amarillo')
      ? 'amarillo'
      : 'verde',
    totalAvgFlowRateM3s: subcuencas.reduce(
      (acc, s) => acc + s.stations.reduce((stAcc, st) => stAcc + st.flowRateM3s, 0),
      0
    ) / (subcuencas.reduce((acc, s) => acc + s.stations.length, 0) || 1),
    maxRainfall24hMm: Math.max(
      ...subcuencas.flatMap((s) => s.stations.map((st) => st.rainfallMm24h)),
      0
    ),
    lastSystemSync: lastSyncTime,
    isOfflineMode: isOffline
  };

  return {
    subcuencas,
    summary,
    isOffline,
    isLoading,
    hasNewData,
    refreshData
  };
}
