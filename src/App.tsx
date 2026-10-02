import { useState } from 'react';
import { 
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
  ChevronDown, 
  ExternalLink, 
  BookOpen,
  Award,
  Users2,
  Table,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { useSATData } from './hooks/useSATData';
import { useTheme } from './hooks/useTheme';
import { DashboardMetrics } from './components/DashboardMetrics';
import { HydrologicalMap } from './components/HydrologicalMap';
import { SubcuencasList } from './components/SubcuencasList';
import { ProvenanceModal } from './components/ProvenanceModal';
import { InstallPrompt } from './components/InstallPrompt';
import { InstitutionalBulletins } from './components/InstitutionalBulletins';
import { DataExplorerView } from './components/DataExplorerView';
import type { RiskLevel, Subcuenca, DataSourceProvenance } from './types/sat';

export function App() {
  const { subcuencas, summary, isLoading, hasNewData, refreshData } = useSATData();
  const { theme, toggleTheme } = useTheme();

  // Estado para alternar entre el SAT Principal y el Explorador de Tablas de Datos
  const [currentView, setCurrentView] = useState<'sat' | 'explorer'>('sat');

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

  // Si el usuario está en la vista del Explorador de Datos, mostramos DataExplorerView a pantalla completa
  if (currentView === 'explorer') {
    return <DataExplorerView onBackToMain={() => setCurrentView('sat')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* 1. BANNER INSTITUCIONAL: AVISO DE SOFTWARE EN DESARROLLO */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-blue-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-red-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="p-1 bg-amber-400 text-red-950 rounded font-bold text-[10px] tracking-wider uppercase shrink-0">
              Fase Experimental
            </span>
            <span className="leading-snug">
              <strong>Proyecto en Desarrollo:</strong> Este software es una iniciativa científica del <strong>GIHH - Universidad del Cauca</strong> orientada a proveer un entorno seguro y unificado para la interconexión con las alertas oficiales de las instituciones hidroambientales.
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] opacity-80 shrink-0">
            Facultad de Ingeniería Civil
          </span>
        </div>
      </div>

      {/* Banner de datos nuevos si hubo cambio tras auto-sync */}
      {hasNewData && (
        <div className="bg-blue-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm animate-pulse">
          <Bell className="w-4 h-4" />
          Telemetría actualizada: Se han registrado variaciones hidrológicas en la red de Popayán.
        </div>
      )}

      {/* Header Institucional con Colores de la Universidad del Cauca */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-red-900/10 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Identidad Institucional y Escudo */}
          <div className="flex items-center space-x-3 min-w-0">
            <a 
              href="https://www.unicauca.edu.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 rounded-xl bg-white border border-slate-200 dark:border-slate-700 shadow-2xs hover:scale-105 transition-transform shrink-0"
              title="Portal Oficial Universidad del Cauca"
            >
              <img 
                src="/Escudo_Universidad_cauca.png" 
                alt="Escudo Universidad del Cauca" 
                className="w-9 h-10 object-contain"
              />
            </a>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-red-950 dark:text-red-100 leading-tight">
                  SAT HIDROLÓGICO POPAYÁN
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800/60">
                  GIHH · FIC
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Grupo de Investigación en Ingeniería Hidráulica e Hidrológica · Unicauca
              </p>
            </div>
          </div>

          {/* Controles de cabecera */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Pestaña / Botón de acceso directo a la vista de Tablas y Series */}
            <button
              onClick={() => setCurrentView('explorer')}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-900 hover:bg-red-800 text-white rounded-lg shadow-xs transition cursor-pointer"
              title="Abrir explorador de tablas de datos, series temporales y descargas CSV"
            >
              <Table className="w-4 h-4" />
              <span className="hidden sm:inline">Tablas & Series</span>
            </button>

            {/* Enlace Institucional Directo Unicauca */}
            <a
              href="https://www.unicauca.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-900 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800/40 rounded-lg transition"
              title="Ir al Portal Oficial de la Universidad del Cauca"
            >
              <span>Portal Unicauca</span>
              <ExternalLink className="w-3 h-3" />
            </a>

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
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-700 dark:text-red-400' : ''}`} />
            </button>

            {/* Modal de Transparencia */}
            <button
              onClick={handleOpenGlobalProvenance}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
              <span>Metrología</span>
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
                <Newspaper className="w-5 h-5 text-red-800 dark:text-red-400" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Fuentes Oficiales y Boletines Institucionales
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Acceso directo e intermediación a los últimos informes técnicos de la CRC, IDEAM, IGAC, UNGRD, SGC y DIMAR
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Botón de acceso rápido a tablas de datos */}
              <button
                onClick={() => setCurrentView('explorer')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                <Table className="w-3.5 h-3.5 text-red-800 dark:text-red-400" />
                <span>Explorar Tablas Históricas</span>
              </button>

              {/* Botón de acceso rápido al monitoreo */}
              <button
                onClick={scrollToAlerts}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-900 dark:text-red-300 hover:text-red-950 dark:hover:text-red-200 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800/60 transition cursor-pointer"
              >
                <span>Monitoreo en Vivo</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
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
              <Layers className="w-5 h-5 text-blue-800 dark:text-blue-400" />
              Monitoreo Hidrológico y Clasificación de Riesgo en Cuencas Abastecedoras
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Telemetría y semaforización continua para las subcuencas Río Molino, Palacé, Las Piedras, Cauca y Pisojé
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
                  <Map className="w-4 h-4 text-red-800 dark:text-red-400" />
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
                <Layers className="w-4 h-4 text-blue-800 dark:text-blue-400" />
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

        {/* ======================================================== */}
        {/* 3. SECCIÓN DETALLADA DEL GRUPO DE INVESTIGACIÓN (GIHH)   */}
        {/* ======================================================== */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Información Académica y Scienti MinCiencias */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800/60 inline-flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> MinCiencias: COL0010048
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Categoría A MinCiencias
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  Grupo de Investigación en Ingeniería Hidráulica e Hidrológica (GIHH)
                </h3>
                <p className="text-sm font-semibold text-red-900 dark:text-red-400 mt-1">
                  Facultad de Ingeniería Civil · Universidad del Cauca · Popayán, Colombia
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                El <strong>GIHH</strong> lidera la investigación científica en hidrología de cuencas de montaña, hidráulica fluvial, modelación hidrodinámica y gestión del riesgo de desastres en el suroccidente colombiano. Como parte de sus líneas de investigación en <em>Modelación Hidrológica y Alertas Tempranas</em>, este sistema busca consolidar un entorno tecnológicamente seguro y accesible para la articulación en tiempo real entre comunidades, autoridades ambientales y entidades de socorro.
              </p>

              {/* Tarjetas de áreas de experticia */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800">
                  <BookOpen className="w-4 h-4 text-red-800 dark:text-red-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Modelación Hidráulica</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    Simulación de tránsito de crecientes, aforos y curvas IDF para cuencas andinas.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800">
                  <Users2 className="w-4 h-4 text-blue-800 dark:text-blue-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Gestión del Riesgo</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    Zonificación de amenazas torrenciales e inundaciones para Popayán y municipios del Cauca.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800">
                  <Award className="w-4 h-4 text-amber-700 dark:text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Telemetría e IoT</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    Diseño de nodos sensores limnimétricos y redes LoRaWAN de bajo costo en cuenca alta.
                  </p>
                </div>
              </div>

              {/* Botones de acción institucional */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000002148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-sm transition hover:scale-102"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Ficha Oficial GrupLAC (MinCiencias)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://www.unicauca.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 transition"
                >
                  <span>Universidad del Cauca</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Columna Derecha: Imagen de la Facultad de Ingeniería Civil y Escudo */}
            <div className="lg:col-span-4 flex flex-col items-center gap-4">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-950 p-2">
                <img 
                  src="/FIC.jpg" 
                  alt="Facultad de Ingeniería Civil - Universidad del Cauca" 
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="p-3 text-center">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Facultad de Ingeniería Civil
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Sede Tulcán · Universidad del Cauca
                  </p>
                </div>
              </div>

              {/* Botones de socorro y emergencia de Popayán */}
              <div className="w-full max-w-sm flex gap-2">
                <a
                  href="tel:119"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 rounded-xl text-xs font-bold transition text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" /> Bomberos (119)
                </a>
                <a
                  href="tel:132"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition text-center"
                >
                  Cruz Roja (132)
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. BANNER / PESTAÑA INFERIOR DE ACCESO A TABLAS DE DATOS */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-red-800/40 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5 uppercase tracking-wider">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Repositorio Histórico Abierto
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Tablas de Datos, Series Temporales y Exportación
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Inspecciona series hidrométricas filtradas por día, mes, año o histórico completo. Visualiza registros organizados por autor/custodio (GIHH, IDEAM, CRC, LoRaWAN), clasificados por fecha, tipo de dato y valor medido, con descarga directa en formato <strong>CSV</strong> y reportes técnicos certificados.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('explorer')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-700 hover:bg-red-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-red-950/50 hover:scale-105 transition-all cursor-pointer shrink-0"
            >
              <Table className="w-5 h-5" />
              <span>Abrir Explorador de Datos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* Footer Institucional Unicauca */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/Escudo_Universidad_cauca.png" 
              alt="Unicauca" 
              className="w-7 h-8 object-contain"
            />
            <div className="text-left">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                Universidad del Cauca · Popayán, Colombia
              </p>
              <p className="text-[11px] text-slate-500">
                Grupo de Investigación en Ingeniería Hidráulica e Hidrológica (GIHH) · Facultad de Ingeniería Civil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs flex-wrap justify-center">
            <button
              onClick={() => setCurrentView('explorer')}
              className="hover:text-red-800 dark:hover:text-red-400 font-bold underline decoration-slate-300 cursor-pointer"
            >
              Ver Tablas de Datos
            </button>
            <span>·</span>
            <a 
              href="https://www.unicauca.edu.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-red-800 dark:hover:text-red-400 font-semibold underline decoration-slate-300"
            >
              www.unicauca.edu.co
            </a>
            <span>·</span>
            <a 
              href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000002148" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-800 dark:hover:text-red-400 font-semibold underline decoration-slate-300"
            >
              GrupLAC MinCiencias
            </a>
            <span>·</span>
            <span>PWA Offline Workbox</span>
          </div>
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
