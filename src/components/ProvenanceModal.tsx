import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  Radio, 
  Calendar, 
  ShieldCheck, 
  X, 
  Cpu,
  Compass
} from 'lucide-react';
import type { DataSourceProvenance } from '../types/sat';

interface ProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  provenance: DataSourceProvenance | null;
  subcuencaName?: string;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({
  isOpen,
  onClose,
  provenance,
  subcuencaName
}) => {
  if (!isOpen || !provenance) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Transparencia & Procedencia del Dato
              </h3>
              <p className="text-xs text-slate-400">
                {subcuencaName ? `Cuenca: ${subcuencaName}` : 'Protocolo Oficial GIHH / CRC / IDEAM'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Técnico Institucional */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Entidad Responsable */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Entidad y Custodio Técnico
                </span>
                <p className="text-sm font-medium text-slate-100">{provenance.institution}</p>
                <p className="text-xs text-slate-400 font-mono">Código de Estación: {provenance.stationCode}</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Validado {provenance.dataQualityConfidence}%
              </span>
            </div>
          </div>

          {/* Grilla de Atributos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5 text-blue-400" /> Nombre de la Estación
              </span>
              <p className="font-semibold text-slate-200">{provenance.stationName}</p>
            </div>

            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Instrumentación Hidrológica
              </span>
              <p className="font-semibold text-slate-200">{provenance.sensorModel}</p>
            </div>

            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Radio className="w-3.5 h-3.5 text-amber-400" /> Transmisión & Red
              </span>
              <p className="font-semibold text-slate-200">{provenance.transmissionProtocol}</p>
            </div>

            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Última Calibración
              </span>
              <p className="font-semibold text-slate-200">{provenance.calibrationDate}</p>
            </div>
          </div>

          {/* Margen de Incertidumbre y Precisión */}
          <div className="p-3.5 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Margen de Error Hidrométrico:</span>
              <span className="font-mono text-cyan-300">{provenance.precisionMargin}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300 mt-2">
              <span className="text-slate-400">Fecha y Hora de la Muestra:</span>
              <span className="font-mono text-slate-200">{provenance.lastSyncTimestamp}</span>
            </div>
          </div>

          {/* Marco Legal / Boletín */}
          {(provenance.legalResolution || provenance.bulletinId) && (
            <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded-xl text-xs space-y-1">
              <span className="text-blue-300 font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5" /> Referencia Normativa y Boletín
              </span>
              {provenance.legalResolution && (
                <p className="text-slate-300">{provenance.legalResolution}</p>
              )}
              {provenance.bulletinId && (
                <p className="text-cyan-400 font-mono">Identificador Oficial: {provenance.bulletinId}</p>
              )}
            </div>
          )}

          <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/30 p-3 rounded-lg border border-slate-800/50">
            <strong>Garantía Metrológica GIHH:</strong> Todos los datos limnimétricos son filtrados mediante algoritmos de remoción de ruido hidrodinámico y transmitidos bajo cifrado de capa física para garantizar la inmutabilidad de la alerta temprana.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-t border-slate-800 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Certificado de Integridad Activo
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
