import { ExternalLink, Globe, FileText, CalendarDays, Hash } from 'lucide-react';
import type { InstitutionBulletin } from '../types/sat';
import { institutions } from '../data/institutionsData';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function InstitutionCard({ institution }: { institution: InstitutionBulletin }) {
  const { acronym, fullName, description, bulletinUrl, colorClass, latestBulletin } =
    institution;

  // Extract the border color class for the badge accent
  const borderColorClass = colorClass.split(' ').find((c) => c.startsWith('border-')) ?? '';
  const textColorClass = colorClass.split(' ').find((c) => c.startsWith('text-')) ?? '';

  return (
    <div
      className={`rounded-xl border ${colorClass} p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/20`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Globe className={`h-4 w-4 shrink-0 ${textColorClass}`} />
            <h3 className="text-lg font-bold text-slate-100">{acronym}</h3>
          </div>
          <p className="mt-0.5 text-sm leading-snug text-slate-400">{fullName}</p>
        </div>
        <span
          className={`ml-2 shrink-0 rounded-full border ${borderColorClass} bg-slate-800/60 px-2.5 py-0.5 text-xs font-medium text-slate-300`}
        >
          Fuente Oficial
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-slate-400">{description}</p>

      {/* Latest Bulletin */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3.5">
        <div className="mb-2 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Último boletín
          </span>
        </div>

        <h4 className="mb-2 text-sm font-semibold leading-snug text-slate-200">
          {latestBulletin.title}
        </h4>

        <p className="mb-3 text-xs leading-relaxed text-slate-400">
          {latestBulletin.summary}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {formatDate(latestBulletin.date)}
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-3 w-3" />
            {latestBulletin.bulletinNumber}
          </span>
        </div>
      </div>

      {/* External Link */}
      <a
        href={bulletinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${textColorClass} transition-colors hover:underline`}
      >
        Ver boletines
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

export function InstitutionalBulletins() {
  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-slate-100">
        Boletines Institucionales
      </h2>
      <p className="mb-6 text-sm text-slate-400">
        Fuentes oficiales de información hidrometeorológica y gestión del riesgo en Colombia
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {institutions.map((inst) => (
          <InstitutionCard key={inst.id} institution={inst} />
        ))}
      </div>
    </section>
  );
}
