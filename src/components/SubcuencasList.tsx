import React from 'react';
import type { Subcuenca, RiskLevel } from '../types/sat';
import { Users, Info, ChevronRight, Gauge } from 'lucide-react';

interface SubcuencasListProps {
  subcuencas: Subcuenca[];
  selectedSubcuencaId: string | null;
  onSelectSubcuenca: (id: string) => void;
  onOpenProvenance: (subcuenca: Subcuenca) => void;
  filterRisk: RiskLevel | 'todas';
  onFilterChange: (risk: RiskLevel | 'todas') => void;
}

export const SubcuencasList: React.FC<SubcuencasListProps> = ({
  subcuencas,
  selectedSubcuencaId,
  onSelectSubcuenca,
  onOpenProvenance,
  filterRisk,
  onFilterChange
}) => {
  const getRiskBorder = (risk: RiskLevel) => {
    switch (risk) {
      case 'verde':
        return 'border-l-4 border-l-emerald-600 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900';
      case 'amarillo':
        return 'border-l-4 border-l-amber-500 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900';
      case 'naranja':
        return 'border-l-4 border-l-orange-500 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900';
      case 'rojo':
        return 'border-l-4 border-l-rose-600 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/50 dark:hover:bg-rose-950/30';
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'verde':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20">NORMAL</span>;
      case 'amarillo':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20">PREVENCIÓN</span>;
      case 'naranja':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 dark:bg-orange-500/10 text-orange-800 dark:text-orange-400 border border-orange-300 dark:border-orange-500/20">ALERTA</span>;
      case 'rojo':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-500/20">EMERGENCIA</span>;
    }
  };

  const filtered = filterRisk === 'todas' 
    ? subcuencas 
    : subcuencas.filter((s) => s.currentRisk === filterRisk);

  return (
    <div className="space-y-4">
      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Filtro Hidrológico ({filtered.length}):
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['todas', 'rojo', 'naranja', 'amarillo', 'verde'] as const).map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange(r)}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition capitalize cursor-pointer ${
                filterRisk === r 
                  ? 'bg-cyan-700 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Tarjetas de Subcuenca */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        {filtered.map((sub) => {
          const isSelected = sub.id === selectedSubcuencaId;
          const mainStation = sub.stations[0];

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubcuenca(sub.id)}
              className={`p-4 rounded-xl border shadow-xs transition-all cursor-pointer ${getRiskBorder(sub.currentRisk)} ${
                isSelected 
                  ? 'border-cyan-600 dark:border-cyan-500 ring-2 ring-cyan-600/30 dark:ring-cyan-500/40 bg-cyan-50/30 dark:bg-slate-900' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Encabezado */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition flex items-center gap-1">
                    {sub.name}
                    {isSelected && <ChevronRight className="w-4 h-4 text-cyan-600 inline" />}
                  </h4>
                  <span className="text-xs text-cyan-800 dark:text-cyan-400 font-semibold block mt-0.5">
                    {sub.waterTreatmentPlant}
                  </span>
                </div>
                {getRiskBadge(sub.currentRisk)}
              </div>

              {/* Resumen */}
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {sub.description}
              </p>

              {/* Indicadores numéricos de la estación */}
              {mainStation && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800/50">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Nivel de Lámina</span>
                    <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                      {mainStation.waterLevelMeters.toFixed(2)} m
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800/50">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Caudal Aforado</span>
                    <span className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-300">
                      {mainStation.flowRateM3s.toFixed(1)} m³/s
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800/50">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Precipitación 24h</span>
                    <span className="text-xs font-bold font-mono text-blue-700 dark:text-blue-400">
                      {mainStation.rainfallMm24h.toFixed(1)} mm
                    </span>
                  </div>
                </div>
              )}

              {/* Trazabilidad y Población */}
              <div className="flex items-center justify-between mt-3 pt-2 text-xs border-t border-slate-50 dark:border-slate-800/40">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {sub.exposedPopulation.toLocaleString('es-CO')} hab. expuestos
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProvenance(sub);
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 bg-cyan-50 dark:bg-cyan-950/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800/60 transition cursor-pointer"
                  title="Consultar origen técnico, instrumento y calibración"
                >
                  <Info className="w-3 h-3" /> Metrología & Fuente
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
