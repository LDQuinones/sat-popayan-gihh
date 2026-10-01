import type { Subcuenca } from '../types/sat';

export const POPAYAN_SUBCUENCAS_DATA: Subcuenca[] = [
  {
    id: 'rio-molino',
    name: 'Subcuenca del Río Molino',
    river: 'Río Molino',
    areaKm2: 38.4,
    exposedPopulation: 145000,
    currentRisk: 'naranja',
    waterTreatmentPlant: 'PTAP Tulcán (Abastece más del 60% del casco urbano)',
    description: 'Cuenca de respuesta torrencial rápida. Cruza directamente el Centro Histórico de Popayán. Alta vulnerabilidad por avenidas torrenciales y movimientos en masa en la parte alta (vereda La Tetilla / Los Sauces).',
    center: [2.4435, -76.582],
    bounds: [[2.41, -76.62], [2.47, -76.54]],
    dataSource: {
      institution: 'GIHH - Universidad del Cauca',
      stationCode: 'GIHH-MOL-01',
      stationName: 'Estación Hidrométrica Automática Molino N°1 (Puente Viejo)',
      legalResolution: 'Convenio Interadministrativo GIHH-CRC No. 042-2023',
      bulletinId: 'ALERTA-HIDRO-MOL-1024',
      sensorModel: 'Radar de Nivel VegaPuls C21 + Pluviómetro Pronamic Pro',
      calibrationDate: '15 de Enero de 2026',
      precisionMargin: '± 2 mm en nivel / ± 0.1 mm precipitación',
      transmissionProtocol: 'LoRaWAN 915MHz',
      lastSyncTimestamp: '2026-10-01 18:25:00 COT',
      dataQualityConfidence: 99.2
    },
    historicalWarningSummary: 'Avenida torrencial histórica registrada en 1949 y 2013. Nivel actual en fase de alerta por lluvias persistentes en cabecera.',
    stations: [
      {
        id: 'st-mol-01',
        name: 'Molino - Tulcán (Bocatoma)',
        type: 'limnimetro',
        lat: 2.4485,
        lng: -76.5912,
        elevationMeters: 1780,
        lastReadingTime: 'Hace 4 min',
        batteryLevelPct: 94,
        transmissionSignalDbm: -72,
        waterLevelMeters: 2.35,
        flowRateM3s: 18.4,
        rainfallMm1h: 12.0,
        rainfallMm24h: 68.5,
        thresholds: {
          yellow: 1.5,
          orange: 2.2,
          red: 2.9
        },
        status: 'naranja'
      },
      {
        id: 'st-mol-02',
        name: 'Molino - Alta Montaña (La Tetilla)',
        type: 'pluviometro',
        lat: 2.4352,
        lng: -76.541,
        elevationMeters: 2450,
        lastReadingTime: 'Hace 2 min',
        batteryLevelPct: 88,
        transmissionSignalDbm: -84,
        waterLevelMeters: 1.15,
        flowRateM3s: 6.2,
        rainfallMm1h: 24.5,
        rainfallMm24h: 84.0,
        thresholds: {
          yellow: 1.2,
          orange: 1.8,
          red: 2.5
        },
        status: 'naranja'
      }
    ]
  },
  {
    id: 'rio-palace',
    name: 'Subcuenca del Río Palacé',
    river: 'Río Palacé',
    areaKm2: 142.0,
    exposedPopulation: 98000,
    currentRisk: 'amarillo',
    waterTreatmentPlant: 'PTAP Palacé (Sector Norte y Nueva Popayán)',
    description: 'Cuenca de gran aporte hídrico ubicada al nororiente. Su bocatoma abastece sectores residenciales e industriales del norte del municipio. Presenta arrastre moderado de sedimentos en épocas de invierno.',
    center: [2.512, -76.541],
    bounds: [[2.46, -76.59], [2.56, -76.48]],
    dataSource: {
      institution: 'CRC',
      stationCode: 'CRC-PAL-04',
      stationName: 'Estación Hidrométrica Puente Palacé',
      legalResolution: 'Plan de Ordenamiento y Manejo POMCA Río Palacé Res. 2018-091',
      bulletinId: 'BOLETÍN-CRC-2026-88',
      sensorModel: 'Sensor Ultrasónico MaxBotix MB7389 + OTT Pluvio²',
      calibrationDate: '02 de Diciembre de 2025',
      precisionMargin: '± 5 mm en nivel de lámina',
      transmissionProtocol: 'GPRS/MQTT',
      lastSyncTimestamp: '2026-10-01 18:20:00 COT',
      dataQualityConfidence: 97.8
    },
    historicalWarningSummary: 'Comportamiento estable con tendencia a crecientes súbitas por descargas desde el páramo de Las Delicias.',
    stations: [
      {
        id: 'st-pal-01',
        name: 'Palacé - Bocatoma Municipal',
        type: 'limnimetro',
        lat: 2.518,
        lng: -76.535,
        elevationMeters: 1820,
        lastReadingTime: 'Hace 8 min',
        batteryLevelPct: 96,
        transmissionSignalDbm: -68,
        waterLevelMeters: 1.62,
        flowRateM3s: 14.8,
        rainfallMm1h: 6.2,
        rainfallMm24h: 42.1,
        thresholds: {
          yellow: 1.5,
          orange: 2.4,
          red: 3.2
        },
        status: 'amarillo'
      }
    ]
  },
  {
    id: 'rio-las-piedras',
    name: 'Subcuenca del Río Las Piedras',
    river: 'Río Las Piedras',
    areaKm2: 52.8,
    exposedPopulation: 42000,
    currentRisk: 'verde',
    waterTreatmentPlant: 'Bocatoma auxiliar y fuente de reserva Acueducto de Popayán',
    description: 'Subcuenca con cobertura boscosa y zonas de reserva hídrica protegidas por la Fundación Río Piedras y comunidades campesinas. Tiempos de concentración medios.',
    center: [2.408, -76.551],
    bounds: [[2.37, -76.59], [2.44, -76.51]],
    dataSource: {
      institution: 'GIHH - Universidad del Cauca',
      stationCode: 'GIHH-LPD-02',
      stationName: 'Estación Telemétrica Reserva Las Piedras',
      legalResolution: 'Red Institucional Monitoreo Comunitario GIHH No. 11-2024',
      bulletinId: 'GIHH-RP-2026-512',
      sensorModel: 'Nodo LoRaWAN ESP32 + Transductor de Presión Hidrostática',
      calibrationDate: '10 de Febrero de 2026',
      precisionMargin: '± 3 mm fondo de cuenca',
      transmissionProtocol: 'LoRaWAN 915MHz',
      lastSyncTimestamp: '2026-10-01 18:28:00 COT',
      dataQualityConfidence: 98.9
    },
    historicalWarningSummary: 'Caudal en régimen normal de estiaje/lluvias bajas. Sin novedad en las últimas 72 horas.',
    stations: [
      {
        id: 'st-pie-01',
        name: 'Las Piedras - Puente Santa Bárbara',
        type: 'limnimetro',
        lat: 2.412,
        lng: -76.558,
        elevationMeters: 1910,
        lastReadingTime: 'Hace 1 min',
        batteryLevelPct: 91,
        transmissionSignalDbm: -78,
        waterLevelMeters: 0.88,
        flowRateM3s: 5.4,
        rainfallMm1h: 1.5,
        rainfallMm24h: 18.0,
        thresholds: {
          yellow: 1.4,
          orange: 2.0,
          red: 2.7
        },
        status: 'verde'
      }
    ]
  },
  {
    id: 'rio-cauca',
    name: 'Cuenca Alta del Río Cauca (Paso por Popayán)',
    river: 'Río Cauca',
    areaKm2: 410.0,
    exposedPopulation: 185000,
    currentRisk: 'amarillo',
    waterTreatmentPlant: 'Cuerpo receptor principal y aprovechamiento agropecuario',
    description: 'Eje fluvial macro de la meseta de Popayán. Recibe los aportes de los ríos Molino, Palacé, Pisojé y quebradas urbanas. Puntos críticos de inundación en veredas río abajo y asentamientos de ribera.',
    center: [2.465, -76.62],
    bounds: [[2.41, -76.67], [2.52, -76.57]],
    dataSource: {
      institution: 'IDEAM',
      stationCode: 'IDEAM-26027010',
      stationName: 'Estación Hidrológica Cauca - Puente Florida / Huila',
      bulletinId: 'BOLETÍN IDEAM N° 0924-ALERTA',
      sensorModel: 'Estación Geostacionaria Satelital GOES-16 + Radar OTT',
      calibrationDate: '18 de Noviembre de 2025',
      precisionMargin: '± 1 cm norma OMM (WMO)',
      transmissionProtocol: 'Servicio Web SOAP/REST IDEAM',
      lastSyncTimestamp: '2026-10-01 18:00:00 COT',
      dataQualityConfidence: 99.5
    },
    historicalWarningSummary: 'Caudal en incremento continuo por lluvias generalizadas en el Macizo Colombiano. Monitoreo constante.',
    stations: [
      {
        id: 'st-cau-01',
        name: 'Río Cauca - Puente Florida',
        type: 'limnimetro',
        lat: 2.472,
        lng: -76.628,
        elevationMeters: 1710,
        lastReadingTime: 'Hace 15 min',
        batteryLevelPct: 100,
        transmissionSignalDbm: -60,
        waterLevelMeters: 3.42,
        flowRateM3s: 58.2,
        rainfallMm1h: 4.8,
        rainfallMm24h: 39.5,
        thresholds: {
          yellow: 3.2,
          orange: 4.5,
          red: 5.6
        },
        status: 'amarillo'
      }
    ]
  },
  {
    id: 'rio-pisoje',
    name: 'Subcuenca del Río Pisojé',
    river: 'Río Pisojé',
    areaKm2: 31.2,
    exposedPopulation: 35000,
    currentRisk: 'verde',
    waterTreatmentPlant: 'Riego agrícola, acueductos veredales y Centro Recreativo Pisojé',
    description: 'Subcuenca oriental con nacimientos en los cerros tutelares. Importante impacto en comunidades periurbanas del oriente de Popayán y complejos turísticos.',
    center: [2.463, -76.545],
    bounds: [[2.43, -76.57], [2.49, -76.51]],
    dataSource: {
      institution: 'GIHH - Universidad del Cauca',
      stationCode: 'GIHH-PIS-03',
      stationName: 'Estación Experimental Pisojé - Unicauca',
      legalResolution: 'Proyecto de Monitoreo Hidrológico de Microcuencas Unicauca',
      bulletinId: 'GIHH-PIS-EXP-2026',
      sensorModel: 'Nodo Telemétrico LoRa ESP32 Dual-Core + Sensor Presión Diferencial',
      calibrationDate: '20 de Diciembre de 2025',
      precisionMargin: '± 2 mm',
      transmissionProtocol: 'LoRaWAN 915MHz',
      lastSyncTimestamp: '2026-10-01 18:22:00 COT',
      dataQualityConfidence: 98.1
    },
    historicalWarningSummary: 'Niveles dentro de la curva de duración normal sin riesgos hidrodinámicos inmediatos.',
    stations: [
      {
        id: 'st-pis-01',
        name: 'Pisojé - Confluencia Quebrada La Monja',
        type: 'limnimetro',
        lat: 2.458,
        lng: -76.551,
        elevationMeters: 1840,
        lastReadingTime: 'Hace 5 min',
        batteryLevelPct: 87,
        transmissionSignalDbm: -82,
        waterLevelMeters: 0.95,
        flowRateM3s: 4.1,
        rainfallMm1h: 3.2,
        rainfallMm24h: 21.0,
        thresholds: {
          yellow: 1.3,
          orange: 1.9,
          red: 2.6
        },
        status: 'verde'
      }
    ]
  }
];
