import { CldPicture } from "@/components/media/CldPicture";
import { getFirstFolderAsset } from "@/lib/cloudinary";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// Asymmetric: portrait takes the narrower column, the record carries the width.
// The three placings are the whole argument of this section, so they are set as
// a list with the year leading rather than buried in a paragraph.
export async function Trainer() {
  const { trainer } = site;
  const portrait = await getFirstFolderAsset(site.media.trainerFolder, "image");

  return (
    <Section id="trainer" innerClassName="lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
      {/* The frame clips its contents, which makes it a scroll container, so */}
      {/* the portrait borrows a timeline named on the column outside it. */}
      <div className="timeline-group lg:col-span-5">
        <div className="overflow-hidden rounded-media bg-media-bg">
          <CldPicture
            publicId={portrait?.publicId ?? null}
            alt={portrait?.alt ?? `${trainer.name}, ${trainer.role}`}
            width={720}
            height={900}
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholderLabel={`Portrait appears here once an image is uploaded to the "${site.media.trainerFolder}" folder in Cloudinary`}
            className="reveal-settle in-group aspect-[4/5] h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="stagger mt-10 lg:col-span-7 lg:mt-0">
        <p className="reveal type-eyebrow text-accent">{trainer.role}</p>
        <h2 className="reveal mt-4 type-h2 text-ink">Coach {trainer.name}</h2>
        <p className="reveal mt-6 max-w-xl type-lead text-ink-muted">
          She competes in powerlifting at national level and coaches the floor herself, so the
          person correcting your setup has taken the same lifts under a judge.
        </p>

        <h3 className="reveal mt-10 type-eyebrow text-ink-muted">Competition record</h3>
        <ul className="stagger mt-4 max-w-xl">
          {trainer.awards.map((award) => (
            <li
              key={award}
              className="reveal border-t border-border py-4 type-body text-ink last:border-b"
            >
              {award}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
