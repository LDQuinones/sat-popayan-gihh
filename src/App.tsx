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
  Bell,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { useSATData } from './hooks/useSATData';
import { useTheme } from './hooks/useTheme';
import { DashboardMetrics } from './components/DashboardMetrics';
import { HydrologicalMap } from './components/HydrologicalMap';
import { SubcuencasList } from './components/SubcuencasList';
import { ProvenanceModal } from './components/ProvenanceModal';
import { InstallPrompt } from './components/InstallPrompt';
import { InstitutionalBulletins } from './components/InstitutionalBulletins';
import type { RiskLevel, Subcuenca, DataSourceProvenance } from './types/sat';

export function App() {
  const { subcuencas, summary, isLoading, hasNewData, refreshData } = useSATData();
  const { theme, toggleTheme } = useTheme();

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

  const scrollToAlerts = () => {
    const section = document.getElementById('seccion-alertas-hidrologicas');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors duration-200 selection:bg-cyan-500 selection:text-white">
      {/* Banner de datos nuevos si hubo cambio tras auto-sync */}
      {hasNewData && (
        <div className="bg-cyan-700 text-white text-center py-2 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm animate-pulse">
          <Bell className="w-4 h-4" />
          Telemetría actualizada: Se han registrado variaciones hidrológicas en la red de Popayán.
        </div>
      )}

      {/* Header Institucional Académico */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Identidad Institucional */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-700 to-blue-900 text-white rounded-xl shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  SAT HIDROLÓGICO POPAYÁN
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                  GIHH · UNICAUCA
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sistema de Alerta Temprana ante Inundaciones y Avenidas Torrenciales
              </p>
            </div>
          </div>

          {/* Controles de cabecera */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Botón PWA */}
            <InstallPrompt />

            {/* Alternador de Modo Claro / Oscuro */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition cursor-pointer"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Sincronización Manual */}
            <button
              onClick={() => refreshData()}
              disabled={isLoading}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition disabled:opacity-50 cursor-pointer"
              title="Sincronizar telemetría ahora (ciclo automático cada 5 min)"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-600 dark:text-cyan-400' : ''}`} />
            </button>

            {/* Modal de Transparencia */}
            <button
              onClick={handleOpenGlobalProvenance}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span>Transparencia & Fuente</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ======================================================== */}
        {/* 1. SECCIÓN INICIAL: BOLETINES INSTITUCIONALES (OFICIALES) */}
        {/* ======================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Fuentes Oficiales y Boletines Institucionales
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Acceso directo a los últimos informes técnicos oficiales de la CRC, IDEAM, IGAC, UNGRD, SGC y DIMAR
              </p>
            </div>

            {/* Acceso rápido hacia la clasificación de alertas */}
            <button
              onClick={scrollToAlerts}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 bg-cyan-50 dark:bg-cyan-950/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-200 dark:border-cyan-800/60 transition cursor-pointer self-start sm:self-auto"
            >
              <span>Ver Monitoreo de Cuencas en Vivo</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grilla de Boletines */}
          <InstitutionalBulletins />
        </section>

        {/* ======================================================== */}
        {/* 2. SECCIÓN POST-SCROLL: CLASIFICACIÓN DE ALERTAS & MAPA */}
        {/* ======================================================== */}
        <section id="seccion-alertas-hidrologicas" className="pt-4 space-y-6">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
              Monitoreo Hidrológico y Clasificación de Riesgo en Cuencas Abastecedoras
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Telemetría y semaforización en tiempo real para las subcuencas Río Molino, Palacé, Las Piedras, Cauca y Pisojé
            </p>
          </div>

          {/* Métricas Resumen y Estado Consolidado */}
          <DashboardMetrics 
            summary={summary}
            onOpenGlobalProvenance={handleOpenGlobalProvenance}
          />

          {/* Mapa Hidrológico y Lista de Subcuencas Vinculada */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Mapa Interactivo (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                  Cartografía Telemétrica de Popayán
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Selecciona una estación para inspeccionar lámina y caudal
                </span>
              </div>

              <HydrologicalMap
                subcuencas={subcuencas}
                selectedSubcuencaId={selectedSubcuencaId}
                onSelectSubcuenca={(id) => setSelectedSubcuencaId(id)}
                onOpenProvenance={handleOpenSubcuencaProvenance}
              />
            </div>

            {/* Listado de Subcuencas y Clasificación Semafórica (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                Clasificación de Alertas por Subcuenca
              </h3>

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
        </section>

        {/* Respaldo Científico Institucional */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Soporte Científico y Operativo
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Grupo de Investigación de Ingeniería Hidráulica e Hidrológica (GIHH) · Universidad del Cauca
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Este sistema consolida datos procedentes de limnígrafos de radar en tiempo real, redes LoRaWAN y boletines emitidos por IDEAM, CRC, SGC y UNGRD. El algoritmo valida las mediciones y actualiza la clasificación de alerta cada 5 minutos; si no se detectan variaciones, la vista permanece inmutable para evitar parpadeos y preservar el estado del usuario.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <a
                href="tel:119"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 rounded-xl text-xs font-bold transition"
              >
                <PhoneCall className="w-4 h-4" /> Bomberos Popayán (119)
              </a>
              <a
                href="tel:132"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cruz Roja Cauca (132)
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} GIHH · Universidad del Cauca · Popayán, Colombia</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            PWA con Operación Fuera de Línea (Workbox) · Ciclo de Actualización 5 min
          </span>
        </div>
      </footer>

      {/* Modal Institucional de Procedencia */}
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
