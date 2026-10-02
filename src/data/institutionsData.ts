import type { InstitutionBulletin } from '../types/sat';

export const institutions: InstitutionBulletin[] = [
  {
    id: 'crc',
    acronym: 'CRC',
    fullName: 'Corporación Autónoma Regional del Cauca',
    description: 'Autoridad ambiental regional del Cauca',
    url: 'https://crc.gov.co',
    bulletinUrl: 'https://experience.arcgis.com/experience/2262ffcc4ba349aa90e1ab6b2b5a9095/page/Gesti%C3%B3n-del-Riesgo',
    colorClass: 'border-green-500/40 bg-green-500/5 text-green-400',
    latestBulletin: {
      title: 'Geoportal de Gestión del Riesgo y Recurso Hídrico — Cuenca Cauca',
      date: '2026-10-01',
      summary:
        'Monitoreo espacial continuo de amenazas hidrológicas y cuencas abastecedoras en el departamento del Cauca.',
      bulletinNumber: 'GEO-CRC-2026-GR',
    },
  },
  {
    id: 'ideam',
    acronym: 'IDEAM',
    fullName: 'Instituto de Hidrología, Meteorología y Estudios Ambientales',
    description: 'Pronósticos hidrometeorológicos nacionales',
    url: 'https://www.ideam.gov.co',
    bulletinUrl: 'https://www.ideam.gov.co/sala-de-prensa/boletines',
    colorClass: 'border-blue-500/40 bg-blue-500/5 text-blue-400',
    latestBulletin: {
      title: 'Boletín de Predicción Climática y Alertas — Octubre 2026',
      date: '2026-09-30',
      summary:
        'Condiciones de La Niña débil persisten sobre el Pacífico ecuatorial. Se prevén lluvias por encima del promedio en la región andina suroccidental durante las próximas dos semanas.',
      bulletinNumber: 'BP-IDEAM-2026-274',
    },
  },
  {
    id: 'igac',
    acronym: 'IGAC',
    fullName: 'Instituto Geográfico Agustín Codazzi',
    description: 'Cartografía y georreferenciación nacional',
    url: 'https://www.igac.gov.co',
    bulletinUrl: 'https://www.igac.gov.co/noticias',
    colorClass: 'border-amber-500/40 bg-amber-500/5 text-amber-400',
    latestBulletin: {
      title: 'Actualización Cartográfica de Zonas de Riesgo Hídrico',
      date: '2026-09-28',
      summary:
        'Se publicaron los mapas actualizados de zonificación de amenaza por inundación para el departamento del Cauca, con resolución espacial de 5 metros.',
      bulletinNumber: 'NC-IGAC-2026-042',
    },
  },
  {
    id: 'ungrd',
    acronym: 'UNGRD',
    fullName: 'Unidad Nacional para la Gestión del Riesgo de Desastres',
    description: 'Gestión del riesgo y respuesta ante emergencias',
    url: 'https://portal.gestiondelriesgo.gov.co',
    bulletinUrl:
      'https://portal.gestiondelriesgo.gov.co/Paginas/Noticias.aspx',
    colorClass: 'border-orange-500/40 bg-orange-500/5 text-orange-400',
    latestBulletin: {
      title: 'Situación de Temporada de Lluvias — Suroccidente Colombiano',
      date: '2026-10-01',
      summary:
        'Se activa alerta naranja para los municipios ribereños del Cauca. Se despliegan equipos de primera respuesta y se verifican rutas de evacuación.',
      bulletinNumber: 'SI-UNGRD-2026-189',
    },
  },
  {
    id: 'sgc',
    acronym: 'SGC',
    fullName: 'Servicio Geológico Colombiano',
    description: 'Monitoreo volcánico y sismología',
    url: 'https://www.sgc.gov.co',
    bulletinUrl: 'https://www2.sgc.gov.co/Noticias/Paginas/Historico-de-noticias.aspx',
    colorClass: 'border-red-500/40 bg-red-500/5 text-red-400',
    latestBulletin: {
      title: 'Boletín de Actividad Volcán Puracé — Nivel Amarillo',
      date: '2026-09-29',
      summary:
        'El volcán Puracé mantiene nivel de actividad amarillo (III). Se registraron 245 eventos sísmicos de tipo volcano-tectónico durante la última semana.',
      bulletinNumber: 'BV-SGC-2026-039',
    },
  },
  {
    id: 'dimar',
    acronym: 'DIMAR',
    fullName: 'Dirección General Marítima (CIOH)',
    description: 'Centro de Investigaciones Oceanográficas e Hidrográficas. Condiciones meteomarinas y fluviales del Pacífico colombiano.',
    url: 'https://www.dimar.mil.co',
    bulletinUrl: 'https://cioh.dimar.mil.co/index.php/es/',
    colorClass: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400',
    latestBulletin: {
      title: 'Boletín Meteorológico Marino — Pacífico Colombiano',
      date: '2026-09-30',
      summary:
        'Se reporta oleaje moderado a fuerte en el litoral Pacífico caucano. Vientos del suroeste con ráfagas de hasta 35 nudos. Precaución para navegación menor.',
      bulletinNumber: 'BM-DIMAR-2026-274',
    },
  },
];
