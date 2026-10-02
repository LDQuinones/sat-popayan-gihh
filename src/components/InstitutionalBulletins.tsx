import { ExternalLink, Globe, FileText, CalendarDays, Hash } from 'lucide-react';

interface BulletinInfo {
  title: string;
  date: string;
  summary: string;
  bulletinNumber: string;
}

interface Institution {
  id: string;
  acronym: string;
  fullName: string;
  description: string;
  url: string;
  bulletinUrl: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  latestBulletin: BulletinInfo;
}

const INSTITUTIONS: Institution[] = [
  {
    id: 'crc',
    acronym: 'CRC',
    fullName: 'Corporación Autónoma Regional del Cauca',
    description: 'Autoridad ambiental regional del Cauca. Monitoreo de recurso hídrico y cuencas hidrográficas.',
    url: 'https://crc.gov.co',
    bulletinUrl: 'https://crc.gov.co/index.php/ambiental/recurso-hidrico',
    borderColor: 'border-green-500/40',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/5',
    latestBulletin: {
      title: 'Monitoreo Recurso Hídrico — Cuenca del Río Cauca',
      date: '1 de octubre de 2026',
      summary: 'Se reportan niveles estables en los principales afluentes del río Cauca. Se mantiene vigilancia sobre las subcuencas Molino, Pubús y Saté por incrementos pluviométricos.',
      bulletinNumber: 'BH-CRC-2026-087'
    }
  },
  {
    id: 'ideam',
    acronym: 'IDEAM',
    fullName: 'Instituto de Hidrología, Meteorología y Estudios Ambientales',
    description: 'Pronósticos hidrometeorológicos nacionales, alertas y boletines climáticos oficiales.',
    url: 'https://www.ideam.gov.co',
    bulletinUrl: 'http://www.ideam.gov.co/web/pronosticos-y-alertas/boletines-e-informes-tecnicos',
    borderColor: 'border-blue-500/40',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500/5',
    latestBulletin: {
      title: 'Boletín de Predicción Climática y Alertas — Octubre 2026',
      date: '30 de septiembre de 2026',
      summary: 'Condiciones de La Niña débil persisten sobre el Pacífico ecuatorial. Se prevén lluvias por encima del promedio en la región andina suroccidental durante las próximas dos semanas.',
      bulletinNumber: 'BP-IDEAM-2026-274'
    }
  },
  {
    id: 'igac',
    acronym: 'IGAC',
    fullName: 'Instituto Geográfico Agustín Codazzi',
    description: 'Cartografía, georreferenciación nacional y zonificación de amenazas territoriales.',
    url: 'https://www.igac.gov.co',
    bulletinUrl: 'https://www.igac.gov.co/noticias',
    borderColor: 'border-amber-500/40',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    latestBulletin: {
      title: 'Actualización Cartográfica de Zonas de Riesgo Hídrico',
      date: '28 de septiembre de 2026',
      summary: 'Se publicaron los mapas actualizados de zonificación de amenaza por inundación para el departamento del Cauca, con resolución espacial de 5 metros.',
      bulletinNumber: 'NC-IGAC-2026-042'
    }
  },
  {
    id: 'ungrd',
    acronym: 'UNGRD',
    fullName: 'Unidad Nacional para la Gestión del Riesgo de Desastres',
    description: 'Coordinación nacional para la gestión del riesgo, respuesta ante emergencias y evacuaciones.',
    url: 'https://portal.gestiondelriesgo.gov.co',
    bulletinUrl: 'https://portal.gestiondelriesgo.gov.co/Paginas/Noticias.aspx',
    borderColor: 'border-orange-500/40',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-500/5',
    latestBulletin: {
      title: 'Situación de Temporada de Lluvias — Suroccidente Colombiano',
      date: '1 de octubre de 2026',
      summary: 'Se activa alerta naranja para los municipios ribereños del Cauca. Se despliegan equipos de primera respuesta y se verifican rutas de evacuación.',
      bulletinNumber: 'SI-UNGRD-2026-189'
    }
  },
  {
    id: 'sgc',
    acronym: 'SGC',
    fullName: 'Servicio Geológico Colombiano',
    description: 'Monitoreo volcánico, sismología y alertas geológicas a nivel nacional.',
    url: 'https://www.sgc.gov.co',
    bulletinUrl: 'https://www.sgc.gov.co/Noticias',
    borderColor: 'border-red-500/40',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500/5',
    latestBulletin: {
      title: 'Boletín de Actividad Volcán Puracé — Nivel Amarillo',
      date: '29 de septiembre de 2026',
      summary: 'El volcán Puracé mantiene nivel de actividad amarillo (III). Se registraron 245 eventos sísmicos de tipo volcano-tectónico durante la última semana.',
      bulletinNumber: 'BV-SGC-2026-039'
    }
  },
  {
    id: 'dimar',
    acronym: 'DIMAR',
    fullName: 'Dirección General Marítima',
    description: 'Boletines meteorológicos marítimos, fluviales y de oleaje para el Pacífico colombiano.',
    url: 'https://www.dimar.mil.co',
    bulletinUrl: 'https://www.dimar.mil.co/content/boletines-meteorol%C3%B3gicos-marinos',
    borderColor: 'border-cyan-500/40',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    latestBulletin: {
      title: 'Boletín Meteorológico Marino — Pacífico Colombiano',
      date: '30 de septiembre de 2026',
      summary: 'Se reporta oleaje moderado a fuerte en el litoral Pacífico caucano. Vientos del suroeste con ráfagas de hasta 35 nudos. Precaución para navegación menor.',
      bulletinNumber: 'BM-DIMAR-2026-274'
    }
  }
];

function InstitutionCard({ inst }: { inst: Institution }) {
  return (
    <a
      href={inst.bulletinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl border ${inst.borderColor} ${inst.bgColor} p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/30 hover:scale-[1.01] group`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Globe className={`h-5 w-5 shrink-0 ${inst.textColor}`} />
            <h3 className="text-lg font-bold text-slate-100">{inst.acronym}</h3>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-slate-400">{inst.fullName}</p>
        </div>
        <span className={`ml-2 shrink-0 rounded-full border ${inst.borderColor} bg-slate-800/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300`}>
          Fuente Oficial
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-xs text-slate-400 leading-relaxed">{inst.description}</p>

      {/* Latest Bulletin */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3.5">
        <div className="mb-2 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Último boletín
          </span>
        </div>

        <h4 className="mb-2 text-sm font-semibold leading-snug text-slate-200">
          {inst.latestBulletin.title}
        </h4>

        <p className="mb-3 text-xs leading-relaxed text-slate-400">
          {inst.latestBulletin.summary}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {inst.latestBulletin.date}
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-3 w-3" />
            {inst.latestBulletin.bulletinNumber}
          </span>
        </div>
      </div>

      {/* External Link */}
      <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${inst.textColor} group-hover:underline`}>
        Ver boletines oficiales
        <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </a>
  );
}

export function InstitutionalBulletins() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {INSTITUTIONS.map((inst) => (
        <InstitutionCard key={inst.id} inst={inst} />
      ))}
    </div>
  );
}
