"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon, type Marker as LeafletMarker } from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { MappedBranch } from "./branch-map-types";

// Marker drawn as HTML so it takes its colour from the theme rather than
// shipping Leaflet's default PNG pins.
function pinIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: '<span class="branch-pin"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

// Moves the map to the selected branch and opens its popup.
function MapFlyTo({
  branches,
  activeId,
  markerRefs,
}: {
  branches: MappedBranch[];
  activeId: string | null;
  markerRefs: React.RefObject<Record<string, LeafletMarker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!activeId) {
      return;
    }
    const branch = branches.find((entry) => entry.id === activeId);
    if (!branch) {
      return;
    }
    map.flyTo([branch.lat, branch.lng], 16, { duration: 0.9 });
    markerRefs.current?.[branch.id]?.openPopup();
  }, [activeId, branches, map, markerRefs]);

  return null;
}

export function BranchMapClient({
  branches,
  center,
  activeId,
}: {
  branches: MappedBranch[];
  center: [number, number];
  activeId: string | null;
}) {
  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});
  const icon = useMemo(() => pinIcon(), []);

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[branch.lat, branch.lng]}
          icon={icon}
          ref={(instance) => {
            markerRefs.current[branch.id] = instance;
          }}
        >
          <Popup>
            <strong>{branch.name}</strong>
            <br />
            {branch.addressLine}
            {branch.approximate ? (
              <>
                <br />
                <em>Approximate location</em>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
      <MapFlyTo branches={branches} activeId={activeId} markerRefs={markerRefs} />
    </MapContainer>
  );
}
