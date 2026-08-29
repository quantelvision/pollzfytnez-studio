// Every business fact on the site lives here and only here.
// Sources: the client brief and the screenshot of the previous site, confirmed 2026-08-27.

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
    "Strength training, conditioning and personal coaching at Pollz Fytnez Studio in Kolathur, Chennai. Open Monday to Saturday from 5 AM. Message us on WhatsApp for a free trial day.",

  phones: [
    { display: "+91 75500 02947", tel: "+917550002947" },
    { display: "+91 75500 02957", tel: "+917550002957" },
  ],
  // TODO: no public email address has been confirmed. The footer hides the
  // line until one is set here.
  email: null as string | null,

  // Only WhatsApp is a real link. The rest are "#" placeholders so the row can
  // be reviewed. TODO: replace every "#" with the studio's real profile URL
  // before launch, or drop the platforms the studio does not use.
  socials: [
    { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/917550002947" },
    { id: "instagram", label: "Instagram", url: "#" },
    { id: "facebook", label: "Facebook", url: "#" },
    { id: "youtube", label: "YouTube", url: "#" },
    { id: "x", label: "X", url: "#" },
    { id: "threads", label: "Threads", url: "#" },
    { id: "googlemaps", label: "Google Maps", url: "#" },
  ],
  // the studio's real sales mechanism: every primary call to action goes here
  whatsappNumber: "917550002947",

  branches: [
    {
      id: "kolathur-womens",
      name: "Women's studio",
      kind: "women-only",
      address: {
        street: "8A, Sivananda Nagar, 100 Feet Road",
        locality: "Kolathur",
        city: "Chennai",
        region: "Tamil Nadu",
        postalCode: "600099",
        country: "IN",
      },
      mapsUrl: null,
      geo: { lat: 13.1241127, lng: 80.2046276, approximate: true },
    },
    {
      id: "unisex-gym",
      name: "Unisex gym",
      kind: "unisex",
      // PLACEHOLDER for testing the map only. Not a real address.
      // TODO: replace with the real address before this site goes live.
      address: {
        street: "12, Retteri Main Road",
        locality: "Kolathur",
        city: "Chennai",
        region: "Tamil Nadu",
        postalCode: "600099",
        country: "IN",
      },
      mapsUrl: null,
      geo: { lat: 13.1183, lng: 80.2149, approximate: true },
    },
  ] satisfies Branch[],

  // same hours at both branches, confirmed by the client
  hours: [
    {
      label: "Monday to Saturday",
      opens: "5:00 AM",
      closes: "9:30 PM",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens24: "05:00",
      closes24: "21:30",
    },
    {
      label: "Sunday",
      opens: "6:00 AM",
      closes: "1:00 PM",
      schemaDays: ["Sunday"],
      opens24: "06:00",
      closes24: "13:00",
    },
  ],

  stats: {
    membersTrained: "Over 500 members trained",
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

  pricing: {
    annual: { amount: 9999, currency: "INR", display: "Rs 9,999" },
  },

  // Semi-annual and personal training are sold on enquiry; only the annual
  // price is confirmed, so no other number appears anywhere on the site.
  plans: {
    featured: {
      id: "annual",
      name: "Annual plan",
      term: "12 months",
      price: "Rs 9,999",
      cadence: "per year",
      summary: "Full access to the studio and its programs for a year.",
    },
    others: [
      {
        id: "semi-annual",
        name: "Semi-annual plan",
        term: "6 months",
        summary: "The same access on a six month term.",
      },
      {
        id: "personal-training",
        name: "Personal training",
        term: "Per plan",
        summary: "One-on-one coaching with the plan and slots set around you.",
      },
    ],
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
      a: "Monday to Saturday from 5:00 AM to 9:30 PM, and Sunday from 6:00 AM to 1:00 PM. Both branches keep the same hours.",
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
      a: "The annual plan is Rs 9,999. The semi-annual plan and personal training are priced on enquiry. There are no hidden fees on any plan.",
    },
  ],

  trainer: {
    name: "Banu S.",
    role: "Head trainer",
    awards: [
      "3rd place, National Powerlifting Championship 2023, Bengaluru",
      "Five state golds, Coimbatore",
      "3rd place, National Powerlifting Championship 2020, New Delhi",
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
