import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import type { Subcuenca, RiskLevel } from '../types/sat';
import { ExternalLink } from 'lucide-react';

// Fix para el icono por defecto de Leaflet con bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface HydrologicalMapProps {
  subcuencas: Subcuenca[];
  selectedSubcuencaId: string | null;
  onSelectSubcuenca: (id: string) => void;
  onOpenProvenance: (subcuenca: Subcuenca) => void;
}

const createRiskIcon = (risk: RiskLevel) => {
  const colors: Record<RiskLevel, { fill: string; glow: string }> = {
    verde: { fill: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    amarillo: { fill: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
    naranja: { fill: '#f97316', glow: 'rgba(249, 115, 22, 0.5)' },
    rojo: { fill: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' }
  };

  const c = colors[risk];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="13" fill="${c.glow}" opacity="0.6">
        <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="14" cy="14" r="7" fill="${c.fill}" stroke="white" stroke-width="2.5"/>
    </svg>`;

  const svgUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

  return L.icon({
    iconUrl: svgUrl,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

export const HydrologicalMap: React.FC<HydrologicalMapProps> = ({
  subcuencas,
  selectedSubcuencaId,
  onSelectSubcuenca,
  onOpenProvenance
}) => {
  const popayanCenter: [number, number] = [2.4419, -76.6063];

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
      <MapContainer
        center={popayanCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: '#1e293b' }}
      >
        {/* OpenStreetMap estándar - 100% libre, sin API key */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {subcuencas.map((sub) => {
          const isSelected = sub.id === selectedSubcuencaId;

          return (
            <React.Fragment key={sub.id}>
              <Circle
                center={sub.center}
                radius={sub.id === 'rio-cauca' ? 4200 : sub.id === 'rio-palace' ? 3200 : 2200}
                pathOptions={{
                  color: sub.currentRisk === 'rojo' ? '#ef4444' : sub.currentRisk === 'naranja' ? '#f97316' : sub.currentRisk === 'amarillo' ? '#f59e0b' : '#10b981',
                  fillColor: sub.currentRisk === 'rojo' ? '#ef4444' : sub.currentRisk === 'naranja' ? '#f97316' : sub.currentRisk === 'amarillo' ? '#f59e0b' : '#10b981',
                  fillOpacity: isSelected ? 0.25 : 0.08,
                  weight: isSelected ? 2.5 : 1,
                  dashArray: isSelected ? '4, 4' : undefined
                }}
                eventHandlers={{
                  click: () => onSelectSubcuenca(sub.id)
                }}
              />

              {sub.stations.map((st) => (
                <Marker
                  key={st.id}
                  position={[st.lat, st.lng]}
                  icon={createRiskIcon(st.status)}
                  eventHandlers={{
                    click: () => onSelectSubcuenca(sub.id)
                  }}
                >
                  <Popup className="sat-custom-popup">
                    <div className="p-2 min-w-[240px] text-slate-900">
                      <div className="border-b pb-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          {sub.name}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">
                          {st.name}
                        </h4>
                        <span className="text-[11px] text-slate-600 block">
                          Altitud: {st.elevationMeters} m.s.n.m. | {st.lastReadingTime}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="bg-slate-100 p-2 rounded">
                          <span className="text-[10px] text-slate-500 block">Nivel Lámina</span>
                          <span className="font-mono font-bold text-slate-900">
                            {st.waterLevelMeters.toFixed(2)} m
                          </span>
                        </div>
                        <div className="bg-slate-100 p-2 rounded">
                          <span className="text-[10px] text-slate-500 block">Caudal Aforado</span>
                          <span className="font-mono font-bold text-slate-900">
                            {st.flowRateM3s.toFixed(1)} m³/s
                          </span>
                        </div>
                        <div className="bg-slate-100 p-2 rounded">
                          <span className="text-[10px] text-slate-500 block">Lluvia 1h</span>
                          <span className="font-mono font-bold text-blue-700">
                            {st.rainfallMm1h.toFixed(1)} mm
                          </span>
                        </div>
                        <div className="bg-slate-100 p-2 rounded">
                          <span className="text-[10px] text-slate-500 block">Lluvia 24h</span>
                          <span className="font-mono font-bold text-blue-700">
                            {st.rainfallMm24h.toFixed(1)} mm
                          </span>
                        </div>
                      </div>

                      <div className="mb-2 text-[11px] flex justify-between items-center bg-slate-50 p-1.5 rounded border border-slate-200">
                        <span className="text-slate-600">Umbral Alerta Naranja:</span>
                        <span className="font-mono font-semibold text-orange-600">
                          {st.thresholds.orange} m
                        </span>
                      </div>

                      <button
                        onClick={() => onOpenProvenance(sub)}
                        className="w-full mt-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        Ver Fuente & Metrología <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-lg max-w-xs text-xs space-y-1.5 pointer-events-auto">
        <span className="font-semibold text-white block text-[11px] uppercase tracking-wider mb-1">
          Niveles de Alerta Hidrológica
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">Verde: Nivel normal / Seguro</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">Amarillo: Prevención / Incremento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="text-slate-300">Naranja: Alerta / Probabilidad crecida</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300">Rojo: Emergencia / Desbordamiento inminente</span>
        </div>
      </div>
    </div>
  );
};
