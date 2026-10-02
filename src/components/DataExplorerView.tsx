import { useState, useMemo } from 'react';
import { 
  Table, 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  Search, 
  Droplet, 
  Waves, 
  CloudRain, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import type { TimeIntervalFilter } from '../types/sat';
import { POPAYAN_HISTORICAL_DATA } from '../data/historicalData';
import { exportToCSV, exportTechnicalReport } from '../utils/exportUtils';

interface DataExplorerViewProps {
  onBackToMain: () => void;
}

export function DataExplorerView({ onBackToMain }: DataExplorerViewProps) {
  // Estados para filtros
  const [selectedInterval, setSelectedInterval] = useState<TimeIntervalFilter>('mes');
  const [selectedSubcuenca, setSelectedSubcuenca] = useState<string>('todas');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('todos');
  const [selectedDataType, setSelectedDataType] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Paginación para que la tabla sea ágil
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;

  // Filtrado de datos en memoria según los criterios seleccionados
  const filteredRecords = useMemo(() => {
    return POPAYAN_HISTORICAL_DATA.filter((record) => {
      // 1. Filtro temporal
      if (selectedInterval === 'dia') {
        if (record.formattedDate !== '2026-10-02') return false;
      } else if (selectedInterval === 'mes') {
        if (!record.formattedDate.startsWith('2026-10') && !record.formattedDate.startsWith('2026-09')) return false;
      } else if (selectedInterval === 'anio') {
        if (!record.formattedDate.startsWith('2026')) return false;
      }
      // 'historico' abarca todo

      // 2. Filtro por subcuenca
      if (selectedSubcuenca !== 'todas' && record.subcuencaId !== selectedSubcuenca) {
        return false;
      }

      // 3. Filtro por autor / origen
      if (selectedAuthor !== 'todos' && record.author !== selectedAuthor) {
        return false;
      }

      // 4. Filtro por tipo de dato
      if (selectedDataType !== 'todos' && record.dataType !== selectedDataType) {
        return false;
      }

      // 5. Búsqueda por texto (estación, código, autor, etc.)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          record.subcuencaName.toLowerCase().includes(q) ||
          record.stationName.toLowerCase().includes(q) ||
          record.stationId.toLowerCase().includes(q) ||
          record.author.toLowerCase().includes(q) ||
          record.dataType.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedInterval, selectedSubcuenca, selectedAuthor, selectedDataType, searchQuery]);

  // Métricas agregadas para el mini-dashboard superior
  const metrics = useMemo(() => {
    const total = filteredRecords.length;
    const levelRecs = filteredRecords.filter(r => r.dataType === 'Nivel de Lámina');
    const flowRecs = filteredRecords.filter(r => r.dataType === 'Caudal');
    const rainRecs = filteredRecords.filter(r => r.dataType === 'Precipitación');

    const maxLevel = levelRecs.length ? Math.max(...levelRecs.map(r => r.measuredValue)) : 0;
    const avgFlow = flowRecs.length ? (flowRecs.reduce((a, b) => a + b.measuredValue, 0) / flowRecs.length).toFixed(1) : '0.0';
    const totalRain = rainRecs.length ? rainRecs.reduce((a, b) => a + b.measuredValue, 0).toFixed(1) : '0.0';
    const alertsCount = filteredRecords.filter(r => r.qualityFlag === 'Alerta Umbral').length;

    return { total, maxLevel, avgFlow, totalRain, alertsCount };
  }, [filteredRecords]);

  // Paginación de la tabla
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  // Reset de página al cambiar filtros
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Barra superior con navegación */}
      <div className="bg-white dark:bg-slate-900 border-b border-red-900/10 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToMain}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-900 dark:text-red-300 border border-red-200 dark:border-red-800/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Regresar a la página principal del SAT"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al SAT Principal</span>
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
                <Table className="w-5 h-5 text-red-800 dark:text-red-400" />
                Explorador de Series Históricas & Telemetría
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Auditoría, trazabilidad y descarga masiva de datos hidrométricos multiautor
              </p>
            </div>
          </div>

          {/* Botones de Exportación Rápidos */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportToCSV(filteredRecords, `SAT_Popayan_${selectedInterval}`)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-xs transition cursor-pointer"
              title="Descargar conjunto filtrado en formato CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar CSV</span>
            </button>

            <button
              onClick={() => exportTechnicalReport(filteredRecords, selectedInterval, selectedSubcuenca, selectedAuthor)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl shadow-xs transition cursor-pointer"
              title="Descargar reporte técnico del intervalo en TXT"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar Reporte</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 flex flex-col">
        
        {/* ======================================================== */}
        {/* 1. SECCIÓN DE MINI-DASHBOARD DE SERIE SELECCIONADA      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Registros Filtrados</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
              {metrics.total.toLocaleString('es-CO')}
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-red-800 dark:text-red-400" /> Intervalo: {selectedInterval.toUpperCase()}
            </span>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Nivel Máx. Registrado</span>
            <span className="text-xl sm:text-2xl font-black text-red-900 dark:text-red-400 mt-0.5 block">
              {metrics.maxLevel.toFixed(2)} <span className="text-xs font-normal text-slate-400">m</span>
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <Droplet className="w-3 h-3 text-cyan-600" /> Lámina máxima observada
            </span>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Caudal Medio Aforado</span>
            <span className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-300 mt-0.5 block">
              {metrics.avgFlow} <span className="text-xs font-normal text-slate-400">m³/s</span>
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <Waves className="w-3 h-3 text-blue-600" /> Aporte medio en estaciones
            </span>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Lluvia Acumulada</span>
            <span className="text-xl sm:text-2xl font-black text-amber-800 dark:text-amber-400 mt-0.5 block">
              {metrics.totalRain} <span className="text-xs font-normal text-slate-400">mm</span>
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <CloudRain className="w-3 h-3 text-amber-600" /> Pluviómetros en el período
            </span>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Eventos de Umbral</span>
            <span className={`text-xl sm:text-2xl font-black mt-0.5 block ${metrics.alertsCount > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
              {metrics.alertsCount}
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <Sparkles className="w-3 h-3 text-orange-500" /> Superación de nivel naranja/rojo
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. PANEL DE FILTROS MULTIDIMENSIONALES                 */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            {/* Intervalo temporal: Día / Mes / Año / Histórico */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-red-800 dark:text-red-400" /> Período:
              </span>
              {[
                { key: 'dia', label: 'Día Actual' },
                { key: 'mes', label: 'Último Mes' },
                { key: 'anio', label: 'Año 2026' },
                { key: 'historico', label: 'Histórico Total' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setSelectedInterval(tab.key as TimeIntervalFilter);
                    handleFilterChange();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedInterval === tab.key
                      ? 'bg-red-900 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Buscador en tiempo real */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por estación, río..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleFilterChange();
                }}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>
          </div>

          {/* Filtros desplegables secundarios: Subcuenca, Autor / Custodio, Tipo de Dato */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
            {/* Subcuenca */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Subcuenca Hidrográfica
              </label>
              <select
                value={selectedSubcuenca}
                onChange={(e) => {
                  setSelectedSubcuenca(e.target.value);
                  handleFilterChange();
                }}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                <option value="todas">Todas las Subcuencas (5)</option>
                <option value="rio-molino">Río Molino</option>
                <option value="rio-palace">Río Palacé</option>
                <option value="rio-las-piedras">Río Las Piedras</option>
                <option value="rio-cauca">Río Cauca (Popayán)</option>
                <option value="rio-pisoje">Río Pisojé</option>
              </select>
            </div>

            {/* Autor / Origen de la Medición */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Origen / Autor del Dato
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                  handleFilterChange();
                }}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                <option value="todos">Todos los Orígenes / Custodios</option>
                <option value="GIHH - Unicauca">GIHH - Universidad del Cauca</option>
                <option value="IDEAM">IDEAM (Instituto Meteorológico)</option>
                <option value="CRC">CRC (Autoridad Ambiental)</option>
                <option value="Red Comunitaria LoRaWAN">Red Comunitaria LoRaWAN</option>
              </select>
            </div>

            {/* Tipo de Variable */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tipo de Variable Hidrológica
              </label>
              <select
                value={selectedDataType}
                onChange={(e) => {
                  setSelectedDataType(e.target.value);
                  handleFilterChange();
                }}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                <option value="todos">Todas las Variables</option>
                <option value="Nivel de Lámina">Nivel de Lámina (m)</option>
                <option value="Caudal">Caudal (m³/s)</option>
                <option value="Precipitación">Precipitación (mm)</option>
                <option value="Turbiedad">Turbiedad (NTU)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. TABLA DE DATOS CON MÁXIMO 2/3 DE ALTURA DE PANTALLA   */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col flex-1">
          
          {/* Encabezado de la tabla con contador */}
          <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Serie Temporal de Datos Hidrológicos
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-semibold">
                {filteredRecords.length} filas
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Página {currentPage} de {totalPages}
            </div>
          </div>

          {/* Contenedor con límite de 2/3 de altura de pantalla (max-h-[66vh]) y scroll vertical/horizontal */}
          <div className="overflow-y-auto overflow-x-auto max-h-[66vh] divide-y divide-slate-100 dark:divide-slate-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 dark:bg-slate-950/90 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-3">Fecha y Hora</th>
                  <th className="px-4 py-3">Subcuenca</th>
                  <th className="px-4 py-3">Estación / Código</th>
                  <th className="px-4 py-3">Origen (Autor)</th>
                  <th className="px-4 py-3">Tipo de Variable</th>
                  <th className="px-4 py-3 text-right">Valor Medido</th>
                  <th className="px-4 py-3">Unidad</th>
                  <th className="px-4 py-3 text-center">Estado / Calidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((r) => {
                    const isAlert = r.qualityFlag === 'Alerta Umbral';
                    return (
                      <tr 
                        key={r.id}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          isAlert ? 'bg-orange-50/40 dark:bg-orange-950/20' : ''
                        }`}
                      >
                        <td className="px-4 py-2.5 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <span className="font-semibold">{r.formattedDate}</span> <span className="text-slate-400">{r.time}</span>
                        </td>
                        <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          {r.subcuencaName}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <span className="font-medium text-slate-800 dark:text-slate-200 block">{r.stationName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{r.stationId}</span>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                            r.author === 'GIHH - Unicauca'
                              ? 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800'
                              : r.author === 'IDEAM'
                              ? 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                              : r.author === 'CRC'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800'
                          }`}>
                            {r.author}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium">
                          {r.dataType}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-sm text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          {r.measuredValue.toFixed(r.dataType === 'Nivel de Lámina' ? 2 : 1)}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap text-xs">
                          {r.unit}
                        </td>
                        <td className="px-4 py-2.5 text-center whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            isAlert 
                              ? 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800' 
                              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                          }`}>
                            {r.qualityFlag}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                      No se encontraron registros con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Barra inferior de paginación */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Mostrando {paginatedRecords.length} de {filteredRecords.length} registros
            </span>

            <div className="flex items-center space-x-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Página siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
