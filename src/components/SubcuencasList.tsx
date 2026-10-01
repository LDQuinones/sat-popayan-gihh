import React from 'react';
import type { Subcuenca, RiskLevel } from '../types/sat';
import { Users, Info } from 'lucide-react';

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
        return 'border-l-4 border-l-emerald-500 bg-slate-900/60 hover:bg-slate-900';
      case 'amarillo':
        return 'border-l-4 border-l-amber-500 bg-slate-900/60 hover:bg-slate-900';
      case 'naranja':
        return 'border-l-4 border-l-orange-500 bg-slate-900/60 hover:bg-slate-900';
      case 'rojo':
        return 'border-l-4 border-l-rose-500 bg-rose-950/20 hover:bg-rose-950/30';
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'verde':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">NORMAL</span>;
      case 'amarillo':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">PREVENCIÓN</span>;
      case 'naranja':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">ALERTA</span>;
      case 'rojo':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">EMERGENCIA</span>;
    }
  };

  const filtered = filterRisk === 'todas' 
    ? subcuencas 
    : subcuencas.filter((s) => s.currentRisk === filterRisk);

  return (
    <div className="space-y-4">
      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/70 border border-slate-800 rounded-xl">
        <span className="text-xs font-semibold text-slate-300">
          Subcuencas Abastecedoras ({filtered.length}):
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['todas', 'rojo', 'naranja', 'amarillo', 'verde'] as const).map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange(r)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition capitalize cursor-pointer ${
                filterRisk === r 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        {filtered.map((sub) => {
          const isSelected = sub.id === selectedSubcuencaId;
          const mainStation = sub.stations[0];

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubcuenca(sub.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${getRiskBorder(sub.currentRisk)} ${
                isSelected 
                  ? 'border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/40 bg-slate-900' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Encabezado de la cuenca */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-white hover:text-cyan-300 transition">
                      {sub.name}
                    </h4>
                  </div>
                  <span className="text-xs text-cyan-400 font-medium block mt-0.5">
                    {sub.waterTreatmentPlant}
                  </span>
                </div>
                {getRiskBadge(sub.currentRisk)}
              </div>

              {/* Descripción breve */}
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {sub.description}
              </p>

              {/* Métricas rápidas de la estación principal */}
              {mainStation && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
                    <span className="text-[10px] text-slate-500 block">Nivel Lámina</span>
                    <span className="text-xs font-bold font-mono text-slate-100">
                      {mainStation.waterLevelMeters.toFixed(2)} m
                    </span>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
                    <span className="text-[10px] text-slate-500 block">Caudal</span>
                    <span className="text-xs font-bold font-mono text-cyan-300">
                      {mainStation.flowRateM3s.toFixed(1)} m³/s
                    </span>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
                    <span className="text-[10px] text-slate-500 block">Lluvia 24h</span>
                    <span className="text-xs font-bold font-mono text-blue-400">
                      {mainStation.rainfallMm24h.toFixed(1)} mm
                    </span>
                  </div>
                </div>
              )}

              {/* Pie de tarjeta con Transparencia y Población */}
              <div className="flex items-center justify-between mt-3 pt-2 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  {sub.exposedPopulation.toLocaleString('es-CO')} hab. expuestos
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProvenance(sub);
                  }}
                  className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 px-2 py-1 rounded border border-cyan-800/60 transition cursor-pointer"
                  title="Consultar origen técnico, instrumento y calibración"
                >
                  <Info className="w-3 h-3" /> Transparencia & Fuente
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
