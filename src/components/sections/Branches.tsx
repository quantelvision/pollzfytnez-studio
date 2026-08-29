"use client";

import { MapPin, Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { MappedBranch } from "@/components/map/branch-map-types";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

// Leaflet touches window on import, so the map is loaded only in the browser
// and only once this section is reached.
const BranchMapClient = dynamic(
  () => import("@/components/map/BranchMapClient").then((mod) => mod.BranchMapClient),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-media-bg" />,
  },
);

function addressLine(branch: (typeof site.branches)[number]): string {
  if (!branch.address) {
    return "Address coming soon";
  }
  return `${branch.address.street}, ${branch.address.locality}, ${branch.address.city} ${branch.address.postalCode}`;
}

export function Branches() {
  const mapped: MappedBranch[] = site.branches
    .filter((branch) => branch.geo !== null)
    .map((branch) => ({
      id: branch.id,
      name: branch.name,
      addressLine: addressLine(branch),
      lat: branch.geo!.lat,
      lng: branch.geo!.lng,
      approximate: branch.geo!.approximate,
    }));

  const [activeId, setActiveId] = useState<string | null>(mapped[0]?.id ?? null);
  const center: [number, number] = mapped.length
    ? [mapped[0].lat, mapped[0].lng]
    : [13.1241127, 80.2046276];

  return (
    <Section id="locations">
      <div className="max-w-2xl">
        <p className="type-eyebrow text-accent">Locations</p>
        <h2 className="mt-4 type-h2 text-ink">We have two branches</h2>
        <p className="mt-6 type-lead text-ink-muted">
          A women-only studio and a unisex gym, both in Kolathur and both on the same hours. Pick a
          branch to see it on the map.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <ul className="flex flex-col gap-4 lg:col-span-5">
          {site.branches.map((branch) => {
            const isMappable = branch.geo !== null;
            const isActive = activeId === branch.id;
            return (
              <li key={branch.id}>
                <div
                  className={`rounded-card border p-6 transition-[border-color,background-color] ease-brand ${
                    isActive
                      ? "border-accent bg-accent-tint"
                      : "border-border bg-surface-raised"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="type-h3 text-ink">{branch.name}</h3>
                      <p className="mt-1 type-small text-ink-muted">
                        {branch.kind === "women-only" ? "Women only" : "Open to everyone"}
                      </p>
                    </div>
                    <MapPin
                      aria-hidden="true"
                      className={`size-6 shrink-0 ${isActive ? "text-accent" : "text-border-strong"}`}
                    />
                  </div>

                  {branch.address ? (
                    <address className="mt-4 type-body text-ink-muted not-italic">
                      {branch.address.street}
                      <br />
                      {branch.address.locality}, {branch.address.city}{" "}
                      {branch.address.postalCode}
                    </address>
                  ) : (
                    <p className="mt-4 type-body text-ink-muted">
                      Address coming soon. Message us and we will send you directions.
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {isMappable ? (
                      <button
                        type="button"
                        onClick={() => setActiveId(branch.id)}
                        aria-pressed={isActive}
                        className="btn-ring inline-flex items-center gap-2 rounded-button bg-accent px-5 py-2.5 type-button text-on-accent transition-[background-color,box-shadow,transform] ease-brand hover:bg-accent-hover active:scale-(--t-press-scale)"
                      >
                        <Navigation aria-hidden="true" className="size-4" />
                        Show on map
                      </button>
                    ) : null}
                    {branch.mapsUrl ? (
                      <Button href={branch.mapsUrl} external variant="quiet">
                        Open in Google Maps
                      </Button>
                    ) : (
                      <Button
                        href={whatsappLink(whatsappMessages.directions(branch.name))}
                        external
                        variant="quiet"
                      >
                        Ask for directions
                      </Button>
                    )}
                  </div>

                  {branch.geo?.approximate ? (
                    <p className="mt-4 type-small text-ink-muted">
                      The pin shows the Kolathur area. Exact location to be confirmed.
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="overflow-hidden rounded-media border border-border bg-media-bg lg:col-span-7">
          <div className="h-80 w-full lg:h-full lg:min-h-125">
            <BranchMapClient branches={mapped} center={center} activeId={activeId} />
          </div>
        </div>
      </div>
    </Section>
  );
}
