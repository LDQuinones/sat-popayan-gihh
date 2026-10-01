import React from 'react';
import { 
  Users, 
  Waves, 
  CloudRain, 
  Activity, 
  Wifi, 
  WifiOff,
  Clock,
  Info
} from 'lucide-react';
import type { SATDashboardSummary, RiskLevel } from '../types/sat';

interface DashboardMetricsProps {
  summary: SATDashboardSummary;
  onOpenGlobalProvenance: () => void;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  summary,
  onOpenGlobalProvenance
}) => {
  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'verde':
        return {
          label: 'NORMALIDAD',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'amarillo':
        return {
          label: 'PREVENCIÓN (AVISO)',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        };
      case 'naranja':
        return {
          label: 'ALERTA HIDROLÓGICA',
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
        };
      case 'rojo':
        return {
          label: 'EMERGENCIA MÁXIMA',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        };
    }
  };

  const badge = getRiskBadge(summary.highestRiskLevel);

  return (
    <div className="space-y-4">
      {/* Barra de Estado General */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Estado General de la Red Hidrológica Popayán</span>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 mt-0.5 rounded border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {summary.isOfflineMode ? (
            <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
              <WifiOff className="w-3.5 h-3.5" /> Modo Offline (Cache Local)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              <Wifi className="w-3.5 h-3.5" /> Telemetría en Tiempo Real
            </span>
          )}

          <button
            onClick={onOpenGlobalProvenance}
            className="flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 px-2.5 py-1 rounded-lg transition cursor-pointer"
            title="Ver trazabilidad metrológica y marco institucional"
          >
            <Info className="w-3.5 h-3.5" /> Fuente Institucional
          </button>
        </div>
      </div>

      {/* Tarjetas Métricas Clave */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Población Expuesta */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Población Protegida</p>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              {summary.totalPopulationProtected.toLocaleString('es-CO')}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Casco urbano y veredas</p>
          </div>
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Caudal Promedio Acumulado */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Caudal Promedio Red</p>
            <p className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight mt-0.5">
              {summary.totalAvgFlowRateM3s.toFixed(1)} <span className="text-sm font-normal text-slate-400">m³/s</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Aforo continuo cuencas</p>
          </div>
          <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Waves className="w-5 h-5" />
          </div>
        </div>

        {/* Lluvia Acumulada 24h Pico */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Lluvia Máx. (24h)</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-400 tracking-tight mt-0.5">
              {summary.maxRainfall24hMm.toFixed(1)} <span className="text-sm font-normal text-slate-400">mm</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Cabecera Río Molino</p>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>

        {/* Estaciones Telemétricas Activas */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Nodos Telemétricos</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight mt-0.5">
              {summary.activeStations} <span className="text-sm font-normal text-slate-400">activos</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 inline" /> Sync hace 2m
            </p>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
