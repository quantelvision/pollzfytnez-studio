// Every business fact on the site lives here and only here.
// Sources: the client brief and the screenshot of the previous site, confirmed 2026-08-27.

// A day the branch opens, or a day it is shut. The two branches keep different
// hours and the studio closes on Sunday, so closure is real data rather than an
// absence, and nothing may read opens24 or closes24 without checking closed first.
export type HoursSlot =
  | {
      label: string;
      schemaDays: readonly string[];
      closed?: false;
      opens: string;
      closes: string;
      opens24: string;
      closes24: string;
    }
  | {
      label: string;
      schemaDays: readonly string[];
      closed: true;
    };

export interface Branch {
  id: string;
  name: string;
  kind: "women-only" | "unisex";
  // null while the client has not yet supplied the address, see docs/business.md
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  } | null;
  // One sentence for structured data. Says who may train there and what runs,
  // using only confirmed facts.
  description: string;
  // Opening hours are per branch: the two do not keep the same week.
  hours: readonly HoursSlot[];
  // Google Maps share link, pending from the client for both branches
  mapsUrl: string | null;
  // Map pin. approximate is true while only the locality is known, which the
  // UI states plainly rather than implying a precise address. See docs/business.md.
  geo: { lat: number; lng: number; approximate: boolean } | null;
}

export const site = {
  name: "Pollz Fytnez Studio",
  // printed on the logo itself, kept verbatim
  tagline: "Train like a Star",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pollzfytnezstudio.in",
  description:
    "Strength training, conditioning and personal coaching at Pollz Fytnez Studio in Kolathur, Chennai. Two branches, both open from 5 AM Monday to Saturday. Message us on WhatsApp for a free trial day.",

  phones: [
    { display: "+91 75500 02947", tel: "+917550002947" },
    { display: "+91 75500 02957", tel: "+917550002957" },
  ],
  // Confirmed by the client on 2026-09-01. Note this is the address shown on
  // the site; where the contact form delivers is CONTACT_TO_EMAIL in the
  // environment, which has to be set separately.
  email: "pollzfytnez@gmail.com" as string | null,

  // The three platforms the studio uses. All confirmed and real as of 2026-09-01.
  socials: [
    { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/917550002947" },
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/pollzfytnez/" },
    {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/people/Pollz-Fytnez/61590209579189/",
    },
  ],
  // the studio's real sales mechanism: every primary call to action goes here
  whatsappNumber: "917550002947",

  // Names, addresses and hours confirmed by the client on 2026-09-01. The two
  // branches do not keep the same week, so hours belong to the branch.
  branches: [
    {
      id: "pollzfytnez-studio",
      name: "Pollzfytnez Studio",
      kind: "women-only",
      description:
        "Women only gym in Kolathur, Chennai. Strength training, personal training, fitness and conditioning, body toning, weight loss and weight gain programs, CrossFit and online fitness classes.",
      address: {
        street: "8A, Sivananda Nagar, 100 Feet Road",
        locality: "Kolathur",
        city: "Chennai",
        region: "Tamil Nadu",
        postalCode: "600099",
        country: "IN",
      },
      hours: [
        {
          label: "Monday to Saturday",
          schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          closed: false,
          opens: "5:00 AM",
          closes: "9:30 PM",
          opens24: "05:00",
          closes24: "21:30",
        },
        { label: "Sunday", schemaDays: ["Sunday"], closed: true },
      ],
      mapsUrl: null,
      geo: { lat: 13.1241127, lng: 80.2046276, approximate: true },
    },
    {
      id: "pollz-unisex-gym",
      name: "Pollz Unisex Gym",
      kind: "unisex",
      description:
        "Unisex gym in Kolathur, Chennai, open to everyone. Strength training, personal training, fitness and conditioning, body toning, weight loss and weight gain programs, CrossFit and online fitness classes.",
      address: {
        street: "47, 1st Main Street, Thirumalai Nagar",
        locality: "Kolathur",
        city: "Chennai",
        region: "Tamil Nadu",
        postalCode: "600099",
        country: "IN",
      },
      hours: [
        {
          label: "Monday to Saturday",
          schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          closed: false,
          opens: "5:00 AM",
          closes: "10:00 PM",
          opens24: "05:00",
          closes24: "22:00",
        },
        {
          label: "Sunday",
          schemaDays: ["Sunday"],
          closed: false,
          opens: "6:00 AM",
          closes: "1:00 PM",
          opens24: "06:00",
          closes24: "13:00",
        },
      ],
      // TODO: the address is real but this pin is not. It is the Kolathur
      // locality, flagged as approximate in the UI, until the client supplies
      // the Google Maps share link. See docs/business.md.
      geo: { lat: 13.1183, lng: 80.2149, approximate: true },
      mapsUrl: null,
    },
  ] satisfies Branch[],

  stats: {
    membersTrained: "Over 1,000 members trained",
    rating: "4.9",
    ratingOutOf: "5",
  },

  // Names as the client words them, set in sentence case per the house style.
  // Descriptions state what the training involves and claim nothing specific
  // to this studio that has not been confirmed.
  programs: [
    {
      id: "strength-training",
      name: "Strength training",
      description:
        "Barbell and dumbbell work with the load stepped up as you get stronger. Squat, press, hinge and pull, coached for form before weight.",
    },
    {
      id: "personal-training",
      name: "Personal training",
      description:
        "One coach and one member for the whole session, working to a plan built around your starting point and what you are training for.",
    },
    {
      id: "body-fitness-conditioning",
      name: "Body fitness and conditioning",
      description:
        "Circuit and interval work for stamina, with short rests and steady effort across the session.",
    },
    {
      id: "body-toning",
      name: "Body toning",
      description:
        "Higher repetition resistance work that firms up muscle without adding much size.",
    },
    {
      id: "weight-loss",
      name: "Weight loss programs",
      description:
        "Resistance and conditioning work planned for steady fat loss, with progress checked by measurements rather than the scale alone.",
    },
    {
      id: "weight-gain",
      name: "Weight gain programs",
      description:
        "Progressive resistance work aimed at putting on muscle, with training volume raised as you adapt to it.",
    },
    {
      id: "crossfit",
      name: "CrossFit training",
      description:
        "Mixed sessions of lifting, gymnastics movements and conditioning, scaled to what you can do on the day.",
    },
    {
      id: "online-classes",
      name: "Online fitness classes",
      description:
        "Live sessions you join from home, open to men and women, following the same training the studio runs in person.",
    },
  ],

  // Titles set by the client. Bodies stay concrete and use only confirmed facts.
  whyPoints: [
    {
      id: "expert-coaching",
      title: "Expert Personal Coaching",
      body: "Banu S. coaches the floor herself, having placed 3rd at the National Powerlifting Championship in 2023 at Bengaluru and won five state golds.",
    },
    {
      id: "fitness-energy",
      title: "Improved Fitness and Energy",
      body: "Strength and conditioning run together, so you build the stamina to get through a full day rather than just a session.",
    },
    {
      id: "community",
      title: "Empowering Community",
      body: "A working adult, a teenager and a retiree doing mobility work train here in the same session, and nobody is out of place.",
    },
    {
      id: "wellness",
      title: "Holistic Wellness",
      body: "Training is planned around how you sleep, work and eat, not just the hours you spend on the floor.",
    },
  ],

  // The span of confirmed membership prices, used for structured data.
  pricing: {
    currency: "INR",
    lowest: { amount: 8500, display: "Rs 8,500" },
    highest: { amount: 16000, display: "Rs 16,000" },
  },

  // Every membership is a twelve month term. Prices confirmed by the client on
  // 2026-09-01, replacing the earlier annual and semi-annual pair.
  plans: {
    featured: {
      id: "first-fifty",
      name: "Annual membership",
      term: "12 months",
      price: "Rs 9,999",
      cadence: "per year",
      // TODO: a launch offer, so it expires. Remove the badge and rename this
      // plan once the first 50 memberships are taken. See docs/business.md.
      badge: "Opening offer, first 50 members",
      summary: "Full access to the floor and every program the studio runs, for a year.",
    },
    others: [
      {
        id: "student",
        name: "Student offer",
        term: "12 months",
        price: "Rs 8,500",
        summary: "The same year of access, at a lower rate on a valid student ID.",
      },
      {
        id: "couple",
        name: "Couple offer",
        term: "12 months",
        price: "Rs 16,000",
        summary: "Two annual memberships taken together, for the pair of you.",
      },
    ],
    // Coaching rather than a membership, and the only thing priced by the
    // month, so it is set apart from the three above rather than sold as a tier.
    coaching: {
      id: "powerlifting-coaching",
      name: "Powerlifting coaching",
      price: "Rs 1,000",
      cadence: "per month",
      summary:
        "Coached squat, bench and deadlift with a national medallist, programmed month by month.",
    },
  },

  offer: {
    freeTrial: "1 day free trial",
    noHiddenFees: "No hidden fees",
    support: "365 days of support",
  },

  // What happens when someone gets in touch, using the real conversion path.
  steps: [
    {
      id: "message",
      title: "Message us on WhatsApp",
      body: "Tell us which branch suits you and we will book your free trial day.",
    },
    {
      id: "train",
      title: "Come in and train",
      body: "You get shown around the floor and coached through a first session.",
    },
    {
      id: "join",
      title: "Pick a plan when you are ready",
      body: "Choose a term that fits. No hidden fees on any plan.",
    },
  ],

  faq: [
    {
      q: "Can I try the gym before joining?",
      a: "Yes. You get one free trial day. Message us on WhatsApp and we will book a slot that suits you.",
    },
    {
      q: "What are the opening hours?",
      a: "The two branches differ. Pollzfytnez Studio opens Monday to Saturday from 5:00 AM to 9:30 PM and is closed on Sunday. Pollz Unisex Gym opens Monday to Saturday from 5:00 AM to 10:00 PM, and Sunday from 6:00 AM to 1:00 PM.",
    },
    {
      q: "I have never trained in a gym before. Is that a problem?",
      a: "No. Sessions are coached on form first, and the weight is set to what you can handle on the day.",
    },
    {
      q: "Is this a women-only gym?",
      a: "There are two branches: a women-only studio and a unisex gym. Tell us which one suits you and we will point you to it.",
    },
    {
      q: "Who takes the sessions?",
      a: "Banu S. is the head trainer. She placed 3rd at the National Powerlifting Championship in 2023 at Bengaluru and in 2020 at New Delhi, and has won five state golds at Coimbatore.",
    },
    {
      q: "Can I train from home?",
      a: "Yes. Online fitness classes run for men and women who cannot get to the studio, following the same training done in person.",
    },
    {
      q: "What does membership cost?",
      a: "An annual membership is Rs 9,999 for the first 50 members. There is a student rate of Rs 8,500 on a valid student ID, and a couple offer of Rs 16,000 for two. Powerlifting coaching is Rs 1,000 a month. There are no hidden fees on any of them.",
    },
  ],

  trainer: {
    name: "Banu S.",
    role: "Head trainer",
    awards: [
      "3rd in National PowerLifting Championship 2023 - Bengaluru",
      "1st (5 Times Gold) in State PowerLifting Championship 2023 - Coimbatore",
      "3rd in National PowerLifting Championship 2020 - New Delhi",
      "Various Trophies and Awards for State and District level PowerLifting Championships",
    ],
  },

  // Cloudinary folder names. Assets are looked up by folder so the client can
  // swap media by uploading a file, with no code change. See docs/media.md.
  media: {
    heroFolder: "hero",
    galleryFolder: "gallery",
    trainerFolder: "trainer",
  },
} as const;
