import type { HistoricalTelemetryRecord } from '../types/sat';

// Generador de series históricas realistas para las 5 subcuencas de Popayán
// Autores: GIHH - Unicauca, IDEAM, CRC, Red Comunitaria LoRaWAN
export function generatePopayanHistoricalData(): HistoricalTelemetryRecord[] {
  const records: HistoricalTelemetryRecord[] = [];
  
  const subcuencasInfo = [
    { id: 'rio-molino', name: 'Río Molino', stationId: 'GIHH-MOL-01', stationName: 'Molino - Tulcán Bocatoma', author: 'GIHH - Unicauca' as const, baseLevel: 1.8, baseFlow: 12.0 },
    { id: 'rio-molino', name: 'Río Molino', stationId: 'GIHH-MOL-02', stationName: 'Molino - Alta Montaña La Tetilla', author: 'GIHH - Unicauca' as const, baseLevel: 1.1, baseFlow: 5.5 },
    { id: 'rio-palace', name: 'Río Palacé', stationId: 'CRC-PAL-04', stationName: 'Palacé - Bocatoma Municipal', author: 'CRC' as const, baseLevel: 1.6, baseFlow: 14.5 },
    { id: 'rio-las-piedras', name: 'Río Las Piedras', stationId: 'GIHH-LPD-02', stationName: 'Las Piedras - Puente Sta. Bárbara', author: 'Red Comunitaria LoRaWAN' as const, baseLevel: 0.9, baseFlow: 5.2 },
    { id: 'rio-cauca', name: 'Río Cauca', stationId: 'IDEAM-26027010', stationName: 'Cauca - Puente Florida Popayán', author: 'IDEAM' as const, baseLevel: 3.3, baseFlow: 55.0 },
    { id: 'rio-pisoje', name: 'Río Pisojé', stationId: 'GIHH-PIS-03', stationName: 'Pisojé - Confluencia Q. La Monja', author: 'GIHH - Unicauca' as const, baseLevel: 0.95, baseFlow: 4.0 }
  ];

  // Generamos series de datos distribuidas en:
  // 1) Hoy (día actual) - horas cada 30 min
  // 2) Último mes (días recientes)
  // 3) Último año (meses)
  // 4) Histórico (2023 - 2026)

  let idCounter = 1;
  const now = new Date('2026-10-02T11:00:00-05:00');

  // A) Datos de HOY (últimas 24 horas, intervalos de 1-2 horas para cada estación)
  for (let h = 0; h <= 24; h += 2) {
    const d = new Date(now.getTime() - h * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const timeStr = d.toTimeString().split(' ')[0].substring(0, 5);

    subcuencasInfo.forEach((sc, idx) => {
      // Variación estocástica suave
      const noise = Math.sin((h + idx) * 0.8) * 0.25;
      const rainNoise = (h >= 14 && h <= 20) ? (Math.abs(Math.sin(h)) * 14.2) : (Math.random() * 2.5);

      // 1. Nivel de lámina
      const level = Number((sc.baseLevel + noise).toFixed(2));
      records.push({
        id: `rec-${idCounter++}`,
        timestamp: d.toISOString(),
        formattedDate: dateStr,
        time: timeStr,
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Nivel de Lámina',
        measuredValue: level,
        unit: 'm',
        qualityFlag: level > 2.2 ? 'Alerta Umbral' : 'Conforme'
      });

      // 2. Caudal
      const flow = Number((sc.baseFlow * (1 + noise * 0.4)).toFixed(1));
      records.push({
        id: `rec-${idCounter++}`,
        timestamp: d.toISOString(),
        formattedDate: dateStr,
        time: timeStr,
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Caudal',
        measuredValue: flow,
        unit: 'm³/s',
        qualityFlag: 'Conforme'
      });

      // 3. Precipitación
      if (h % 4 === 0) {
        records.push({
          id: `rec-${idCounter++}`,
          timestamp: d.toISOString(),
          formattedDate: dateStr,
          time: timeStr,
          subcuencaId: sc.id,
          subcuencaName: sc.name,
          stationId: sc.stationId,
          stationName: sc.stationName,
          author: sc.author,
          dataType: 'Precipitación',
          measuredValue: Number(rainNoise.toFixed(1)),
          unit: 'mm',
          qualityFlag: rainNoise > 15 ? 'Alerta Umbral' : 'Verificado'
        });
      }
    });
  }

  // B) Datos del ÚLTIMO MES (días de septiembre y agosto 2026)
  for (let day = 1; day <= 30; day += 2) {
    const d = new Date(now.getTime() - day * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const timeStr = '12:00';

    subcuencasInfo.forEach((sc, idx) => {
      const dayFactor = Math.cos(day * 0.4 + idx) * 0.35;
      const level = Number((sc.baseLevel + dayFactor).toFixed(2));
      const rain = Number((Math.max(0, Math.sin(day * 0.7) * 28)).toFixed(1));

      records.push({
        id: `rec-${idCounter++}`,
        timestamp: d.toISOString(),
        formattedDate: dateStr,
        time: timeStr,
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Nivel de Lámina',
        measuredValue: level,
        unit: 'm',
        qualityFlag: level > 2.3 ? 'Alerta Umbral' : 'Verificado'
      });

      records.push({
        id: `rec-${idCounter++}`,
        timestamp: d.toISOString(),
        formattedDate: dateStr,
        time: timeStr,
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Precipitación',
        measuredValue: rain,
        unit: 'mm',
        qualityFlag: 'Conforme'
      });
    });
  }

  // C) Datos del AÑO 2026 y Años Anteriores (Histórico total mensual 2024 - 2025)
  const historicalDates = [
    { date: '2026-06-15', label: 'Invierno Intermedio 2026' },
    { date: '2026-03-22', label: 'Pico Lluvias Marzo 2026' },
    { date: '2026-01-10', label: 'Estiaje Enero 2026' },
    { date: '2025-11-18', label: 'Temporada Lluvias Nov 2025' },
    { date: '2025-08-04', label: 'Verano Agosto 2025' },
    { date: '2025-04-12', label: 'Creciente Abril 2025' },
    { date: '2024-10-25', label: 'Avenida Río Molino 2024' },
    { date: '2024-05-14', label: 'Aforo Estacional Mayo 2024' },
    { date: '2023-11-09', label: 'Histórico Niña 2023' }
  ];

  historicalDates.forEach((hd, hIdx) => {
    subcuencasInfo.forEach((sc, scIdx) => {
      const mult = (hIdx % 2 === 0) ? 1.3 : 0.85;
      const level = Number((sc.baseLevel * mult).toFixed(2));
      const flow = Number((sc.baseFlow * mult).toFixed(1));

      records.push({
        id: `rec-${idCounter++}`,
        timestamp: `${hd.date}T10:00:00.000Z`,
        formattedDate: hd.date,
        time: '10:00',
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Nivel de Lámina',
        measuredValue: level,
        unit: 'm',
        qualityFlag: level > 2.5 ? 'Alerta Umbral' : 'Verificado'
      });

      records.push({
        id: `rec-${idCounter++}`,
        timestamp: `${hd.date}T10:00:00.000Z`,
        formattedDate: hd.date,
        time: '10:00',
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Caudal',
        measuredValue: flow,
        unit: 'm³/s',
        qualityFlag: 'Conforme'
      });

      records.push({
        id: `rec-${idCounter++}`,
        timestamp: `${hd.date}T10:00:00.000Z`,
        formattedDate: hd.date,
        time: '10:00',
        subcuencaId: sc.id,
        subcuencaName: sc.name,
        stationId: sc.stationId,
        stationName: sc.stationName,
        author: sc.author,
        dataType: 'Turbiedad',
        measuredValue: Number((20 + (mult * 45) + (scIdx * 12)).toFixed(1)),
        unit: 'NTU',
        qualityFlag: 'Estimado'
      });
    });
  });

  // Ordenar cronológicamente descendente (más reciente primero)
  return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const POPAYAN_HISTORICAL_DATA = generatePopayanHistoricalData();
