import { useState, useEffect } from 'react';
import type { Subcuenca, SATDashboardSummary } from '../types/sat';
import { POPAYAN_SUBCUENCAS_DATA } from '../data/subcuencasData';

const STORAGE_KEY = 'SAT_POPAYAN_SUBCUENCAS_CACHE_V1';

export function useSATData() {
  const [subcuencas, setSubcuencas] = useState<Subcuenca[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error('Error parseando datos en cache local:', e);
      }
    }
    return POPAYAN_SUBCUENCAS_DATA;
  });

  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('es-CO'));

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

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/telemetry', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubcuencas((prev) => {
          const updated = [...prev];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
      } else {
        console.warn('API Proxy respondió con código no exitoso. Usando réplica en memoria/cache.');
      }
    } catch {
      console.warn('Falla de red o desconexión en campo. Operando en modo Offline Cache.');
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subcuencas));
  }, [subcuencas]);

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
    refreshData
  };
}
