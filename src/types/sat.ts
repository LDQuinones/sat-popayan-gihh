export type RiskLevel = 'verde' | 'amarillo' | 'naranja' | 'rojo';

export interface SensorTelemetry {
  id: string;
  name: string;
  type: 'limnimetro' | 'pluviometro' | 'multisensor';
  lat: number;
  lng: number;
  elevationMeters: number;
  lastReadingTime: string;
  batteryLevelPct: number;
  transmissionSignalDbm: number; // e.g. -85 dBm (LoRaWAN/GPRS)
  waterLevelMeters: number; // Nivel actual en metros
  flowRateM3s: number; // Caudal actual en m³/s
  rainfallMm1h: number; // Lluvia en última hora
  rainfallMm24h: number; // Lluvia acumulada 24h
  thresholds: {
    yellow: number; // Nivel de prevención
    orange: number; // Nivel de alerta
    red: number; // Nivel de evacuación/emergencia
  };
  status: RiskLevel;
}

export interface DataSourceProvenance {
  institution: 'GIHH - Universidad del Cauca' | 'IDEAM' | 'CRC' | 'Red Comunitaria LoRaWAN SAT';
  stationCode: string;
  stationName: string;
  legalResolution?: string;
  bulletinId?: string;
  sensorModel: string;
  calibrationDate: string;
  precisionMargin: string;
  transmissionProtocol: 'LoRaWAN 915MHz' | 'GPRS/MQTT' | 'Servicio Web SOAP/REST IDEAM';
  lastSyncTimestamp: string;
  dataQualityConfidence: number; // e.g., 98.5%
}

export interface Subcuenca {
  id: string;
  name: string;
  river: string;
  areaKm2: number;
  exposedPopulation: number;
  currentRisk: RiskLevel;
  waterTreatmentPlant: string; // PTAP abastecida (ej. Tulcán, Palacé)
  description: string;
  center: [number, number]; // [lat, lng]
  bounds: [[number, number], [number, number]]; // Bounding box
  stations: SensorTelemetry[];
  dataSource: DataSourceProvenance;
  historicalWarningSummary: string;
}

export interface SATDashboardSummary {
  totalPopulationProtected: number;
  activeStations: number;
  totalSubcuencas: number;
  highestRiskLevel: RiskLevel;
  totalAvgFlowRateM3s: number;
  maxRainfall24hMm: number;
  lastSystemSync: string;
  isOfflineMode: boolean;
}
