import { useState } from 'react';
import { 
  ShieldAlert, 
  RefreshCw, 
  Map, 
  Layers, 
  Info, 
  PhoneCall,
  GraduationCap,
  Newspaper,
  Bell
} from 'lucide-react';
import { useSATData } from './hooks/useSATData';
import { DashboardMetrics } from './components/DashboardMetrics';
import { HydrologicalMap } from './components/HydrologicalMap';
import { SubcuencasList } from './components/SubcuencasList';
import { ProvenanceModal } from './components/ProvenanceModal';
import { InstallPrompt } from './components/InstallPrompt';
import { InstitutionalBulletins } from './components/InstitutionalBulletins';
import type { RiskLevel, Subcuenca, DataSourceProvenance } from './types/sat';

export function App() {
  const { subcuencas, summary, isLoading, hasNewData, refreshData } = useSATData();
  const [selectedSubcuencaId, setSelectedSubcuencaId] = useState<string | null>('rio-molino');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'todas'>('todas');
  
  // Estado para el modal de transparencia
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [activeProvenance, setActiveProvenance] = useState<DataSourceProvenance | null>(null);
  const [activeProvenanceTitle, setActiveProvenanceTitle] = useState<string>('');

  const handleOpenSubcuencaProvenance = (subcuenca: Subcuenca) => {
    setActiveProvenance(subcuenca.dataSource);
    setActiveProvenanceTitle(subcuenca.name);
    setIsProvenanceOpen(true);
  };

  const handleOpenGlobalProvenance = () => {
    setActiveProvenance({
      institution: 'GIHH - Universidad del Cauca',
      stationCode: 'CONVENIO-SAT-POPAYAN-2026',
      stationName: 'Red Central de Telemetría e Intermediación Popayán',
      legalResolution: 'Ley 1523 de 2012 (Gestión del Riesgo de Desastres) / Convenio GIHH-CRC-OMGERD',
      bulletinId: 'PROTOCOLO-SAT-GIHH-V3',
      sensorModel: 'Red Híbrida LoRaWAN 915MHz + Telemetría GOES IDEAM + Limnígrafos Radar CRC',
      calibrationDate: 'Enero 2026 - Certificación Metrológica Anual',
      precisionMargin: 'Margen de error cuadrático medio (RMSE) < 2.5%',
      transmissionProtocol: 'LoRaWAN 915MHz',
      lastSyncTimestamp: `${summary.lastSystemSync} COT`,
      dataQualityConfidence: 99.4
    });
    setActiveProvenanceTitle('Marco General de Monitoreo Hidrológico de Popayán');
    setIsProvenanceOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Banner de datos nuevos */}
      {hasNewData && (
        <div className="bg-cyan-600 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 animate-pulse">
          <Bell className="w-4 h-4" />
          Datos hidrológicos actualizados — Los niveles han cambiado
        </div>
      )}

      {/* Header Institucional */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-xl shadow-lg shadow-cyan-900/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  SAT HIDROLÓGICO POPAYÁN
                </h1>
                <span className="hidden md:inline-flex text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  GIHH - UNICAUCA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Monitoreo continuo de cuencas abastecedoras · Actualización automática cada 5 min
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <InstallPrompt />

            <button
              onClick={() => refreshData()}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition disabled:opacity-50 cursor-pointer"
              title="Sincronizar telemetría ahora"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            <button
              onClick={handleOpenGlobalProvenance}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Transparencia & Fuente</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Métricas Resumen */}
        <DashboardMetrics 
          summary={summary}
          onOpenGlobalProvenance={handleOpenGlobalProvenance}
        />

        {/* Mapa + Subcuencas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Map className="w-4 h-4 text-cyan-400" />
                Mapa de Alertas y Estaciones Telemétricas
              </h2>
              <span className="text-xs text-slate-400">
                Click en un marcador para desplegar telemetría
              </span>
            </div>

            <HydrologicalMap
              subcuencas={subcuencas}
              selectedSubcuencaId={selectedSubcuencaId}
              onSelectSubcuenca={(id) => setSelectedSubcuencaId(id)}
              onOpenProvenance={handleOpenSubcuencaProvenance}
            />
          </div>

          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Estado de las Subcuencas
            </h2>

            <SubcuencasList
              subcuencas={subcuencas}
              selectedSubcuencaId={selectedSubcuencaId}
              onSelectSubcuenca={(id) => setSelectedSubcuencaId(id)}
              onOpenProvenance={handleOpenSubcuencaProvenance}
              filterRisk={filterRisk}
              onFilterChange={setFilterRisk}
            />
          </div>
        </div>

        {/* Boletines Institucionales Oficiales */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-cyan-400" />
            Fuentes Oficiales y Boletines Institucionales
          </h2>
          <InstitutionalBulletins />
        </div>

        {/* Respaldo Científico */}
        <div className="p-4 sm:p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Respaldo Científico & Operativo
              </span>
              <h3 className="text-base font-bold text-white">
                Grupo de Investigación de Ingeniería Hidráulica e Hidrológica (GIHH)
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Este sistema integra modelos hidrológicos en tiempo real para las cuencas que surten a la ciudad de Popayán (Río Molino, Río Palacé, Río Las Piedras, Río Cauca y Río Pisojé), coordinando alertas con la Oficina Asesora de Gestión del Riesgo de Desastres de Popayán (OAGRD), CRC e IDEAM. Los datos se actualizan automáticamente cada 5 minutos; si no hay cambios en la telemetría, la interfaz no se modifica.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <a
                href="tel:119"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition"
              >
                <PhoneCall className="w-4 h-4" /> Bomberos Popayán (119)
              </a>
              <a
                href="tel:132"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cruz Roja Seccional Cauca (132)
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} GIHH - Universidad del Cauca | Popayán, Colombia</span>
          <span className="text-slate-400">PWA Offline · Workbox · LoRaWAN · Auto-sync cada 5 min</span>
        </div>
      </footer>

      {/* Modal Institucional */}
      <ProvenanceModal
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
        provenance={activeProvenance}
        subcuencaName={activeProvenanceTitle}
      />
    </div>
  );
}

export default App;
