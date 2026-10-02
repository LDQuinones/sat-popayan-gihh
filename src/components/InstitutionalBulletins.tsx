import { 
  ExternalLink, 
  FileText, 
  CalendarDays, 
  Hash, 
  Building2, 
  Landmark, 
  Compass, 
  AlertOctagon, 
  Mountain, 
  Anchor 
} from 'lucide-react';

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
  icon: typeof Building2;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  bgLight: string;
  bgDark: string;
  badgeLight: string;
  badgeDark: string;
  latestBulletin: BulletinInfo;
}

const INSTITUTIONS: Institution[] = [
  {
    id: 'crc',
    acronym: 'CRC',
    fullName: 'Corporación Autónoma Regional del Cauca',
    description: 'Autoridad ambiental regional del departamento del Cauca. Monitoreo y conservación de cuencas hidrográficas prioritarias.',
    url: 'https://crc.gov.co',
    bulletinUrl: 'https://crc.gov.co/index.php/ambiental/recurso-hidrico',
    icon: Landmark,
    borderLight: 'border-emerald-200 hover:border-emerald-400',
    borderDark: 'dark:border-emerald-500/30 dark:hover:border-emerald-500/60',
    textLight: 'text-emerald-800',
    textDark: 'dark:text-emerald-400',
    bgLight: 'bg-emerald-50/40',
    bgDark: 'dark:bg-emerald-950/20',
    badgeLight: 'bg-emerald-100/80 text-emerald-900 border-emerald-300',
    badgeDark: 'dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50',
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
    description: 'Autoridad científica nacional que suministra información y alertas hidrometeorológicas oficiales para la toma de decisiones.',
    url: 'https://www.ideam.gov.co',
    bulletinUrl: 'http://www.ideam.gov.co/web/pronosticos-y-alertas/boletines-e-informes-tecnicos',
    icon: Building2,
    borderLight: 'border-blue-200 hover:border-blue-400',
    borderDark: 'dark:border-blue-500/30 dark:hover:border-blue-500/60',
    textLight: 'text-blue-800',
    textDark: 'dark:text-blue-400',
    bgLight: 'bg-blue-50/40',
    bgDark: 'dark:bg-blue-950/20',
    badgeLight: 'bg-blue-100/80 text-blue-900 border-blue-300',
    badgeDark: 'dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/50',
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
    description: 'Entidad rectora de la cartografía básica digital, georreferenciación y delimitación fisiográfica del territorio colombiano.',
    url: 'https://www.igac.gov.co',
    bulletinUrl: 'https://www.igac.gov.co/noticias',
    icon: Compass,
    borderLight: 'border-amber-200 hover:border-amber-400',
    borderDark: 'dark:border-amber-500/30 dark:hover:border-amber-500/60',
    textLight: 'text-amber-800',
    textDark: 'dark:text-amber-400',
    bgLight: 'bg-amber-50/40',
    bgDark: 'dark:bg-amber-950/20',
    badgeLight: 'bg-amber-100/80 text-amber-900 border-amber-300',
    badgeDark: 'dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/50',
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
    description: 'Lidera la formulación y articulación del Sistema Nacional de Gestión del Riesgo y los comités territoriales ante emergencias.',
    url: 'https://portal.gestiondelriesgo.gov.co',
    bulletinUrl: 'https://portal.gestiondelriesgo.gov.co/Paginas/Noticias.aspx',
    icon: AlertOctagon,
    borderLight: 'border-orange-200 hover:border-orange-400',
    borderDark: 'dark:border-orange-500/30 dark:hover:border-orange-500/60',
    textLight: 'text-orange-800',
    textDark: 'dark:text-orange-400',
    bgLight: 'bg-orange-50/40',
    bgDark: 'dark:bg-orange-950/20',
    badgeLight: 'bg-orange-100/80 text-orange-900 border-orange-300',
    badgeDark: 'dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-700/50',
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
    description: 'Monitoreo e investigación de amenazas geológicas, sísmicas y de la actividad volcánica del complejo Puracé - Coconucos.',
    url: 'https://www.sgc.gov.co',
    bulletinUrl: 'https://www.sgc.gov.co/Noticias',
    icon: Mountain,
    borderLight: 'border-rose-200 hover:border-rose-400',
    borderDark: 'dark:border-rose-500/30 dark:hover:border-rose-500/60',
    textLight: 'text-rose-800',
    textDark: 'dark:text-rose-400',
    bgLight: 'bg-rose-50/40',
    bgDark: 'dark:bg-rose-950/20',
    badgeLight: 'bg-rose-100/80 text-rose-900 border-rose-300',
    badgeDark: 'dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700/50',
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
    description: 'Regula, vigila y monitorea las condiciones hidrometeorológicas marítimas, estuarinas y fluviales del Pacífico colombiano.',
    url: 'https://www.dimar.mil.co',
    bulletinUrl: 'https://www.dimar.mil.co/content/boletines-meteorol%C3%B3gicos-marinos',
    icon: Anchor,
    borderLight: 'border-cyan-200 hover:border-cyan-400',
    borderDark: 'dark:border-cyan-500/30 dark:hover:border-cyan-500/60',
    textLight: 'text-cyan-800',
    textDark: 'dark:text-cyan-400',
    bgLight: 'bg-cyan-50/40',
    bgDark: 'dark:bg-cyan-950/20',
    badgeLight: 'bg-cyan-100/80 text-cyan-900 border-cyan-300',
    badgeDark: 'dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-700/50',
    latestBulletin: {
      title: 'Boletín Meteorológico Marino — Pacífico Colombiano',
      date: '30 de septiembre de 2026',
      summary: 'Se reporta oleaje moderado a fuerte en el litoral Pacífico caucano. Vientos del suroeste con ráfagas de hasta 35 nudos. Precaución para navegación menor.',
      bulletinNumber: 'BM-DIMAR-2026-274'
    }
  }
];

function InstitutionCard({ inst }: { inst: Institution }) {
  const IconComponent = inst.icon;

  return (
    <a
      href={inst.bulletinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-2xl border ${inst.borderLight} ${inst.borderDark} ${inst.bgLight} ${inst.bgDark} p-5 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 group`}
    >
      {/* Cabecera institucional */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/80 dark:border-slate-800 shrink-0">
            <IconComponent className={`h-5 w-5 ${inst.textLight} ${inst.textDark}`} />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {inst.acronym}
            </h3>
            <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400 line-clamp-1">
              {inst.fullName}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${inst.badgeLight} ${inst.badgeDark}`}>
          Oficial
        </span>
      </div>

      {/* Descripción técnica */}
      <p className="mb-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
        {inst.description}
      </p>

      {/* Cuadro de Último Boletín */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-3.5 shadow-2xs">
        <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 uppercase tracking-wider">
            <FileText className="h-3 w-3" />
            Último Boletín
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Hash className="h-3 w-3" />
            {inst.latestBulletin.bulletinNumber}
          </span>
        </div>

        <h4 className="mb-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
          {inst.latestBulletin.title}
        </h4>

        <p className="mb-2.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
          {inst.latestBulletin.summary}
        </p>

        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800/60">
          <CalendarDays className="h-3 w-3" />
          <span>Emitido: {inst.latestBulletin.date}</span>
        </div>
      </div>

      {/* Enlace al sitio oficial */}
      <div className={`mt-3.5 flex items-center justify-between text-xs font-bold ${inst.textLight} ${inst.textDark}`}>
        <span>Consultar repositorio oficial</span>
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

export function InstitutionalBulletins() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {INSTITUTIONS.map((inst) => (
        <InstitutionCard key={inst.id} inst={inst} />
      ))}
    </div>
  );
}
