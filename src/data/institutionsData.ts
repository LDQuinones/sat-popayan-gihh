import type { InstitutionBulletin } from '../types/sat';

export const institutions: InstitutionBulletin[] = [
  {
    id: 'crc',
    acronym: 'CRC',
    fullName: 'Corporación Autónoma Regional del Cauca',
    description: 'Autoridad ambiental regional del Cauca',
    url: 'https://crc.gov.co',
    bulletinUrl: 'https://crc.gov.co/index.php/ambiental/recurso-hidrico',
    colorClass: 'border-green-500/40 bg-green-500/5 text-green-400',
    latestBulletin: {
      title: 'Monitoreo Recurso Hídrico Cuenca del Río Cauca',
      date: '2026-10-01',
      summary:
        'Se reportan niveles estables en los principales afluentes del río Cauca. Se mantiene vigilancia sobre las subcuencas Molino, Pubús y Saté por incrementos pluviométricos.',
      bulletinNumber: 'BH-CRC-2026-087',
    },
  },
  {
    id: 'ideam',
    acronym: 'IDEAM',
    fullName: 'Instituto de Hidrología, Meteorología y Estudios Ambientales',
    description: 'Pronósticos hidrometeorológicos nacionales',
    url: 'https://www.ideam.gov.co',
    bulletinUrl:
      'http://www.ideam.gov.co/web/pronosticos-y-alertas/boletines-e-informes-tecnicos',
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
    bulletinUrl: 'https://www.sgc.gov.co/Noticias',
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
    fullName: 'Dirección General Marítima',
    description: 'Boletines meteorológicos marítimos y fluviales',
    url: 'https://www.dimar.mil.co',
    bulletinUrl:
      'https://www.dimar.mil.co/content/boletines-meteorol%C3%B3gicos-marinos',
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
