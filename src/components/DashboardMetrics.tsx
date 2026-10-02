import React from 'react';
import { 
  Users, 
  Waves, 
  CloudRain, 
  Activity, 
  Wifi, 
  WifiOff, 
  Clock, 
  FileText
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
          label: 'NORMALIDAD HIDROLÓGICA',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
        };
      case 'amarillo':
        return {
          label: 'NIVEL DE PREVENCIÓN (AVISO)',
          bg: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
        };
      case 'naranja':
        return {
          label: 'ALERTA HIDROLÓGICA MODERADA',
          bg: 'bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30'
        };
      case 'rojo':
        return {
          label: 'EMERGENCIA MÁXIMA / DESBORDAMIENTO',
          bg: 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
        };
    }
  };

  const badge = getRiskBadge(summary.highestRiskLevel);

  return (
    <div className="space-y-4">
      {/* Barra de Estado General */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold tracking-wide uppercase">
              Estado Consolidado de la Red de Alerta Popayán
            </span>
            <span className={`inline-block text-xs font-bold px-2.5 py-0.5 mt-0.5 rounded border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {summary.isOfflineMode ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-2.5 py-1 rounded-lg">
              <WifiOff className="w-3.5 h-3.5" /> Modo Local (Respaldo Fuera de Línea)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-lg">
              <Wifi className="w-3.5 h-3.5" /> Telemetría Activa en Tiempo Real
            </span>
          )}

          <button
            onClick={onOpenGlobalProvenance}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-cyan-200 dark:border-cyan-800/50 px-2.5 py-1 rounded-lg transition cursor-pointer"
            title="Ver trazabilidad metrológica y marco institucional"
          >
            <FileText className="w-3.5 h-3.5" /> Protocolo GIHH
          </button>
        </div>
      </div>

      {/* Tarjetas Métricas Clave */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Población Expuesta */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Población Expuesta</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {summary.totalPopulationProtected.toLocaleString('es-CO')}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Sectores urbanos y veredales</p>
          </div>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-transparent">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Caudal Promedio Acumulado */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Caudal Medio Aforado</p>
            <p className="text-xl sm:text-2xl font-bold text-cyan-800 dark:text-cyan-300 tracking-tight mt-0.5">
              {summary.totalAvgFlowRateM3s.toFixed(1)} <span className="text-xs font-semibold text-slate-500">m³/s</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Monitoreo limnigráfico continuo</p>
          </div>
          <div className="p-2.5 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 rounded-lg border border-cyan-100 dark:border-transparent">
            <Waves className="w-5 h-5" />
          </div>
        </div>

        {/* Lluvia Acumulada 24h Pico */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Precipitación Máx. 24h</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-800 dark:text-amber-400 tracking-tight mt-0.5">
              {summary.maxRainfall24hMm.toFixed(1)} <span className="text-xs font-semibold text-slate-500">mm</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Estación Cuenca Alta Molino</p>
          </div>
          <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-transparent">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>

        {/* Estaciones Telemétricas Activas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Estaciones en Red</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400 tracking-tight mt-0.5">
              {summary.activeStations} <span className="text-xs font-semibold text-slate-500">activas</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 inline" /> Sincronización reciente
            </p>
          </div>
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-transparent">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
