import type { HistoricalTelemetryRecord, TimeIntervalFilter } from '../types/sat';

/**
 * Exporta un arreglo de registros históricos a un archivo CSV descargable.
 */
export function exportToCSV(
  records: HistoricalTelemetryRecord[],
  filenamePrefix: string = 'SAT_Popayan_Telemetria'
) {
  if (!records || records.length === 0) {
    alert('No hay registros disponibles para el intervalo y filtros seleccionados.');
    return;
  }

  // Encabezados normalizados con estándares hidrológicos
  const headers = [
    'ID Registro',
    'Fecha',
    'Hora',
    'Timestamp ISO',
    'Subcuenca',
    'Estacion Codigo',
    'Estacion Nombre',
    'Origen / Autor',
    'Tipo de Variable',
    'Valor Medido',
    'Unidad',
    'Bandera de Calidad'
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.formattedDate}"`,
    `"${r.time}"`,
    `"${r.timestamp}"`,
    `"${r.subcuencaName}"`,
    `"${r.stationId}"`,
    `"${r.stationName}"`,
    `"${r.author}"`,
    `"${r.dataType}"`,
    r.measuredValue,
    `"${r.unit}"`,
    `"${r.qualityFlag}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  const nowStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}_${nowStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Genera un reporte textual técnico con formato Markdown / TXT descargable con estadísticas del intervalo.
 */
export function exportTechnicalReport(
  records: HistoricalTelemetryRecord[],
  interval: TimeIntervalFilter,
  selectedSubcuenca: string,
  selectedAuthor: string
) {
  if (!records || records.length === 0) {
    alert('No hay datos suficientes para generar el reporte técnico.');
    return;
  }

  const dateNow = new Date().toLocaleString('es-CO');
  const total = records.length;
  
  // Métricas agregadas
  const levelRecords = records.filter(r => r.dataType === 'Nivel de Lámina');
  const flowRecords = records.filter(r => r.dataType === 'Caudal');
  const rainRecords = records.filter(r => r.dataType === 'Precipitación');

  const maxLevel = levelRecords.length ? Math.max(...levelRecords.map(r => r.measuredValue)) : 0;
  const avgLevel = levelRecords.length ? (levelRecords.reduce((acc, r) => acc + r.measuredValue, 0) / levelRecords.length).toFixed(2) : '0.00';
  const maxFlow = flowRecords.length ? Math.max(...flowRecords.map(r => r.measuredValue)) : 0;
  const avgFlow = flowRecords.length ? (flowRecords.reduce((acc, r) => acc + r.measuredValue, 0) / flowRecords.length).toFixed(1) : '0.0';
  const totalRain = rainRecords.length ? rainRecords.reduce((acc, r) => acc + r.measuredValue, 0).toFixed(1) : '0.0';
  const alertsCount = records.filter(r => r.qualityFlag === 'Alerta Umbral').length;

  const report = `========================================================================
SISTEMA DE ALERTA TEMPRANA HIDROLÓGICA DE POPAYÁN (SAT)
GRUPO DE INVESTIGACIÓN EN INGENIERÍA HIDRÁULICA E HIDROLÓGICA (GIHH)
FACULTAD DE INGENIERÍA CIVIL - UNIVERSIDAD DEL CAUCA
========================================================================
FECHA DE EMISIÓN DEL REPORTE : ${dateNow}
INTERVALO TEMPORAL CONSULTADO: ${interval.toUpperCase()}
SUBCUENCA SELECCIONADA       : ${selectedSubcuenca.toUpperCase()}
ORIGEN / AUTOR DEL DATO      : ${selectedAuthor.toUpperCase()}
TOTAL DE REGISTROS ANALIZADOS: ${total}
ALERTAS DE UMBRAL REGISTRADAS: ${alertsCount}
========================================================================

RESUMEN METROLÓGICO E HIDROLÓGICO DEL PERÍODO:
------------------------------------------------------------------------
* Nivel de Lámina Máximo   : ${maxLevel} m
* Nivel de Lámina Promedio : ${avgLevel} m
* Caudal Aforado Máximo    : ${maxFlow} m³/s
* Caudal Medio Aforado     : ${avgFlow} m³/s
* Precipitación Acumulada  : ${totalRain} mm

DISTRIBUCIÓN DE REGISTROS POR AUTOR / CUSTODIO:
------------------------------------------------------------------------
- GIHH - Unicauca             : ${records.filter(r => r.author === 'GIHH - Unicauca').length} registros
- IDEAM                       : ${records.filter(r => r.author === 'IDEAM').length} registros
- CRC                         : ${records.filter(r => r.author === 'CRC').length} registros
- Red Comunitaria LoRaWAN     : ${records.filter(r => r.author === 'Red Comunitaria LoRaWAN').length} registros

PRIMEROS REGISTROS DE LA SERIE MUESTRAL:
------------------------------------------------------------------------
${records.slice(0, 15).map(r => `[${r.formattedDate} ${r.time}] | ${r.subcuencaName} | ${r.author} | ${r.dataType}: ${r.measuredValue} ${r.unit} (${r.qualityFlag})`).join('\n')}

========================================================================
Certificación Técnica:
Los datos reflejados provienen de la integración de estaciones telemétricas 
calibradas por el GIHH, boletines oficiales de IDEAM y CRC, y redes comunitarias.
Repositorio Oficial: https://www.unicauca.edu.co
MinCiencias GrupLAC GIHH: COL0010048
========================================================================`;

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Reporte_Hidrologico_SAT_${interval}_${Date.now()}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
