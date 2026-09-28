/* ------------------------------------------------------------------ */
/*  Dummy content — Movers & Cleanout Crew Inc.                        */
/*  Imagery & video: Pexels / Unsplash-style stock (no database).      */
/* ------------------------------------------------------------------ */

const px = (id: number, w = 1200, h = 627) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/* ------------------------------------------------------------------ */
/*  Hero film                                                          */
/* ------------------------------------------------------------------ */
export const heroVideo = {
  // UHD master kept for the (progressively loaded) film poster tiles
  src: "https://videos.pexels.com/video-files/8726905/8726905-uhd_3840_2160_25fps.mp4",
  sd: "https://videos.pexels.com/video-files/8726905/8726905-uhd_2560_1440_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/8726905/pexels-photo-8726905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  credit: "Film · Kampus Production",
};

export const aboutVideo = {
  src: "https://videos.pexels.com/video-files/4277722/4277722-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/4277722/pexels-photo-4277722.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
};

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export interface Service {
  index: string;
  title: string;
  blurb: string;
  tags: string[];
  points: string[];
  img: string;
  alt: string;
  gallery: { img: string; alt: string }[];
  price: string;
  time: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "Full-Service Moving",
    blurb:
      "Local and long-distance moves with wrapped furniture, room-by-room placement and a walkthrough before we call it done.",
    tags: ["Local", "Long distance", "White-glove"],
    points: [
      "Doors, floors & stair rails protected",
      "Furniture disassembly & reassembly included",
      "Room-by-room placement, not curbside drops",
    ],
    img: px(7464244),
    alt: "Two professional movers carrying boxes through a bright new home",
    gallery: [
      { img: px(7464244, 900, 700), alt: "Two movers carrying boxes through a bright living room" },
      { img: px(7464687, 640, 640), alt: "Uniformed movers carrying boxes in a new home" },
      { img: px(7464681, 640, 640), alt: "Mover carrying a green sofa through a hallway" },
      { img: px(7217785, 640, 640), alt: "Team carrying a couch into position" },
      { img: px(7464732, 640, 640), alt: "Mover carrying a box up a staircase" },
      { img: px(7203701, 640, 640), alt: "Labeled boxes stacked and ready for transport" },
    ],
    price: "From $390",
    time: "Same-week booking",
  },
  {
    index: "02",
    title: "Estate Cleanouts",
    blurb:
      "Compassionate whole-home cleanouts for estates, downsizing and hoarding situations — keepsakes set aside, chaos removed.",
    tags: ["Estates", "Downsizing", "Hoarding care"],
    points: [
      "Keepsake & document recovery service",
      "Receivership and executor coordination",
      "Final broom-clean walkthrough",
    ],
    img: px(7464722),
    alt: "Mover carrying a sofa during an estate cleanout",
    gallery: [
      { img: px(7464722, 900, 700), alt: "Crew member carrying a sofa out of an estate home" },
      { img: px(7045765, 640, 640), alt: "Antique chest and settee ready for careful removal" },
      { img: px(36098864, 640, 640), alt: "Period drawing room being catalogued before an estate cleanout" },
      { img: px(6826026, 640, 640), alt: "Vintage kitchenware and keepsakes set aside for the family" },
      { img: px(34764058, 640, 640), alt: "Garage cleared and organized after a sort-through" },
      { img: px(7217801, 640, 640), alt: "Sofa wrapped protectively before leaving the home" },
    ],
    price: "From $650",
    time: "2–5 day projects",
  },
  {
    index: "03",
    title: "Junk Removal",
    blurb:
      "Same-day hauling for furniture, appliances and debris — sorted for donation and recycling before anything hits the dump.",
    tags: ["Same-day", "Eco-sorting"],
    points: [
      "Same-day & next-day pickups",
      "Donation receipts delivered to you",
      "Licensed, insured disposal",
    ],
    img: px(37578626),
    alt: "Crew loading cargo into a truck for junk removal",
    gallery: [
      { img: px(37578626, 900, 700), alt: "Crew securing hauled cargo on the truck" },
      { img: px(6169002, 640, 640), alt: "Team loading parcels from the van" },
      { img: px(15084344, 640, 640), alt: "Box truck staged and ready for the haul-off" },
      { img: px(13641048, 640, 640), alt: "Crew loading the removal van on a city street" },
      { img: px(11808227, 640, 640), alt: "Construction debris bundled for licensed disposal" },
      { img: px(7362917, 640, 640), alt: "Courier staged with a trolley of boxes" },
    ],
    price: "From $149",
    time: "Today, if you call by noon",
  },
  {
    index: "04",
    title: "Deep Cleaning",
    blurb:
      "Move-in and move-out detailing that leaves every surface showing-ready, from baseboards to the inside of the oven.",
    tags: ["Move-in / out", "Post-reno"],
    points: [
      "Realtor-grade showing checklist",
      "Eco-friendly supplies on request",
      "Inside appliances & cabinets",
    ],
    img: px(6197121),
    alt: "Professional cleaners detailing a bright modern kitchen",
    gallery: [
      { img: px(6197121, 900, 700), alt: "Two cleaners detailing a modern kitchen" },
      { img: px(9462101, 640, 640), alt: "Streak-free glass polishing with a spray bottle" },
      { img: px(4021256, 640, 640), alt: "Gloved hands disinfecting surfaces" },
      { img: px(5591930, 640, 640), alt: "Stainless steel refrigerator being wiped down" },
      { img: px(8580755, 640, 640), alt: "Electric stove polished to a showroom shine" },
      { img: px(4239037, 640, 640), alt: "Bathroom vanity scrubbed and sanitized" },
    ],
    price: "From $219",
    time: "3–6 hour visits",
  },
  {
    index: "05",
    title: "Packing & Crating",
    blurb:
      "Full packing service, custom crating for art and antiques, and a labeled inventory you can actually unpack from.",
    tags: ["Art & antiques", "Labeled inventory"],
    points: [
      "Custom wood crating for art",
      "Photo-documented inventory",
      "Unpacking & debris removal",
    ],
    img: px(7217810),
    alt: "Two people carefully wrapping a chair in protective film",
    gallery: [
      { img: px(7217810, 900, 700), alt: "Chair being wrapped in protective film before transport" },
      { img: px(7217839, 640, 640), alt: "Dining chairs wrapped in a sunlit room" },
      { img: px(7217805, 640, 640), alt: "Wicker chair protected with bubble wrap" },
      { img: px(4498140, 640, 640), alt: "Books packed tightly into a carton" },
      { img: px(4498141, 640, 640), alt: "Tape and labels staged for a full pack-out" },
      { img: px(7464731, 640, 640), alt: "This-side-up label on a packed carton" },
    ],
    price: "From $120/hr",
    time: "1–3 day prep",
  },
  {
    index: "06",
    title: "Donation & Disposal",
    blurb:
      "We coordinate charities, recyclers and licensed disposal so your good stuff finds a second life — never a landfill first.",
    tags: ["Charity partners", "Licensed disposal"],
    points: [
      "Tax-deductible donation routing",
      "E-waste & appliance recycling",
      "Dump-free guarantee where possible",
    ],
    img: px(6995065),
    alt: "Volunteers sorting donated clothing for charity",
    gallery: [
      { img: px(6995065, 900, 700), alt: "Volunteers sorting donated goods for charity" },
      { img: px(6994982, 640, 640), alt: "Boxes labeled for the donation center" },
      { img: px(6995179, 640, 640), alt: "Clothing bin prepared for a charity drive" },
      { img: px(6994940, 640, 640), alt: "Smiling volunteers carrying donations" },
      { img: px(6995066, 640, 640), alt: "Clothing folded and packed for delivery" },
      { img: px(6994891, 640, 640), alt: "Volunteer team sorting items into containers" },
    ],
    price: "From $99",
    time: "Scheduled weekly routes",
  },
];

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */
export interface Step {
  index: string;
  title: string;
  body: string;
  img: string;
  alt: string;
}

export const steps: Step[] = [
  {
    index: "01",
    title: "Tell us the mission",
    body: "Share your address, timeline and scope in about sixty seconds. A dedicated coordinator replies within the hour — a human, not a hold queue.",
    img: px(7681579),
    alt: "Friendly coordinator with a headset taking a request",
  },
  {
    index: "02",
    title: "We curate your crew",
    body: "We match vetted, insured local providers to your job and lock one clear quote. No haggling, no surprise fees, no quote roulette.",
    img: px(7681839),
    alt: "Coordinator team assembling a crew for a project",
  },
  {
    index: "03",
    title: "Showtime, handled",
    body: "Your crew arrives on time and in uniform. We track the job through completion and follow up after the handshake.",
    img: px(7464699),
    alt: "Family settling into their new home surrounded by boxes",
  },
];

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
export interface Stat {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

export const stats: Stat[] = [
  { value: 12400, suffix: "+", label: "Projects coordinated" },
  { value: 480, suffix: "+", label: "Vetted provider crews" },
  { value: 4.9, suffix: "", decimals: 1, label: "Average client rating" },
  { value: 98, suffix: "%", label: "On-time completion" },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
export interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
  img: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    city: "Austin, TX",
    quote:
      "The crew treated my grandmother's estate like their own family home. Every box labeled, every keepsake set aside. I cried happy tears.",
    img: px(14634932, 400, 500),
    service: "Estate Cleanout",
  },
  {
    name: "Daniel Reyes",
    role: "Realtor",
    city: "Denver, CO",
    quote:
      "My listings hit the market a full week faster now. One call and the cleanout, the junk and the cleaning are all handled.",
    img: px(18032391, 400, 500),
    service: "Listing Prep",
  },
  {
    name: "Priya Sharma",
    role: "Property Manager",
    city: "Seattle, WA",
    quote:
      "They coordinate five vendors like a symphony. Turnovers used to take us two weeks — now it's three days, every time.",
    img: px(32846944, 400, 500),
    service: "Unit Turnovers",
  },
  {
    name: "Maya Brooks",
    role: "Homeowner",
    city: "Atlanta, GA",
    quote:
      "Booked at 9am, crew arrived by 1pm. The garage of my nightmares is now a showroom. Zero stress, zero surprises.",
    img: px(29748836, 400, 500),
    service: "Junk Removal",
  },
  {
    name: "Elena Rodriguez",
    role: "Interior Designer",
    city: "Miami, FL",
    quote:
      "White-glove is an understatement. They crated a 200-year-old mirror like it was the Mona Lisa and placed it to the inch.",
    img: px(10375984, 400, 500),
    service: "Packing & Crating",
  },
  {
    name: "Claire Bennett",
    role: "Estate Executor",
    city: "Boston, MA",
    quote:
      "Settling my father's estate from across the country felt impossible until M&C took the phone from my hand. They're family now.",
    img: px(38197025, 400, 500),
    service: "Estate Cleanout",
  },
  {
    name: "Jordan Ellis",
    role: "Office Manager",
    city: "Chicago, IL",
    quote:
      "Our office relocation had zero downtime. They moved us Friday night — Monday morning was business as usual.",
    img: px(37070438, 400, 500),
    service: "Office Moving",
  },
  {
    name: "Hannah Lee",
    role: "Homeowner",
    city: "Nashville, TN",
    quote:
      "One quote, one call, one very happy household. We should have done this years ago instead of renting that truck.",
    img: px(7994381, 400, 500),
    service: "Full-Service Move",
  },
];

/* ------------------------------------------------------------------ */
/*  Gallery — recent projects                                          */
/* ------------------------------------------------------------------ */
export const galleryRow1 = [
  { img: px(4247768), alt: "Couple unpacking boxes in their bright new home" },
  { img: px(7464645, 900, 1100), alt: "Joyful couple carrying boxes on moving day" },
  { img: px(7217839), alt: "Chairs wrapped carefully in film before transport" },
  { img: px(7203969), alt: "Playful unpacking moment with cardboard boxes" },
];
export const galleryRow2 = [
  { img: px(7217801), alt: "Sofa wrapped in protective blanket" },
  { img: px(7464473), alt: "Friends moving boxes into a new home" },
  { img: px(4246236), alt: "Couple relaxing on the floor of their new apartment" },
  { img: px(7362917), alt: "Courier with a trolley of boxes" },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
export const officeImg = px(3861563);
export const meetingImg = px(39655922);
export const agentImg = px(7709148);
export const callCenterImg = px(7682352);
export const emptyRoomImg = px(7203701);

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */
export const cities = [
  "Austin",
  "Denver",
  "Seattle",
  "Atlanta",
  "Miami",
  "Boston",
  "Chicago",
  "Nashville",
  "Phoenix",
  "Portland",
  "Dallas",
  "San Diego",
];

export const guarantees = [
  "Licensed, insured & background-checked crews",
  "One coordinator from quote to final walkthrough",
  "Transparent flat pricing — no surprise fees",
  "Careful-first handling, door protection standard",
];

export const tickerItems = [
  "Full-Service Moving",
  "Estate Cleanouts",
  "Junk Removal",
  "Deep Cleaning",
  "Packing & Crating",
  "Donation & Disposal",
];

export const faqs = [
  {
    q: "Are you a moving company or a broker?",
    a: "We're a coordination company. We don't own trucks — we own the standard. Vetted local crews do the lifting while one accountable coordinator manages your quote, schedule and quality from start to finish.",
  },
  {
    q: "How fast can a job be booked?",
    a: "Junk removal and cleaning can often run same-day when you request before noon. Full moves and estate cleanouts typically book within the week, with a flat quote delivered inside the hour.",
  },
  {
    q: "What does 'white-glove' actually include?",
    a: "Door-jamb and floor protection, wrapped furniture, labeled room-by-room placement, keepsake recovery on cleanouts, and a final walkthrough with a checklist you sign — not a shrug.",
  },
  {
    q: "Do you work with estates and sensitive situations?",
    a: "Yes — executors, downsizers and hoarding cases are our specialty. Crews are trained for discretion and compassion, and we can coordinate heirs, realtors and donation partners around your timeline.",
  },
];

export const providerImg = px(7464643);
export const teamImg = px(7464721);
export const contactHeroImg = px(7682358);

export const contact = {
  phone: "(800) 555-0147",
  email: "hello@moverscleanoutcrew.com",
  hq: "1200 Congress Ave, Austin, TX",
  hours: "Mon – Sat · 7am – 8pm CT",
};
