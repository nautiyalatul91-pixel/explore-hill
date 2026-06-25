import trekMoila from "@/assets/trek-moila.jpg";
import trekKedarkantha from "@/assets/trek-kedarkantha.jpg";
import trekNagtibba from "@/assets/trek-nagtibba.jpg";
import trekYulla from "@/assets/trek-yulla.jpg";
import tripHanol from "@/assets/trip-hanol.jpg";
import tripMahasu from "@/assets/trip-mahasu.jpg";

export type Package = {
  slug: string;
  name: string;
  category: "trek" | "trip";
  duration: string;
  price: number;
  priceLabel: string;
  tagline: string;
  image: string;
  highlights: string[];
  route?: string[];
  difficulty?: string;
};

export const treks: Package[] = [
  {
    slug: "moila-top",
    name: "Moila Top Trek",
    category: "trek",
    duration: "3 Days / 2 Nights",
    price: 5999,
    priceLabel: "₹5,999",
    tagline:
      "Forest trails, alpine meadows and bonfire nights under a sky full of stars.",
    image: trekMoila,
    difficulty: "Easy – Moderate",
    highlights: [
      "Dense forest trails",
      "Mountain meadows",
      "Bonfire experience",
      "Camping under the stars",
      "Authentic village stay",
      "Local Garhwali food",
    ],
  },
  {
    slug: "kedarkantha",
    name: "Kedarkantha Trek",
    category: "trek",
    duration: "4 Days / 3 Nights",
    price: 8999,
    priceLabel: "₹8,999",
    tagline:
      "Summit India's most iconic winter peak with a 360° Himalayan panorama.",
    image: trekKedarkantha,
    difficulty: "Moderate",
    highlights: [
      "Snow trekking",
      "Sunrise summit experience",
      "Alpine camping",
      "Photography paradise",
      "Sweeping Himalayan views",
    ],
  },
  {
    slug: "nag-tibba",
    name: "Nag Tibba Trek",
    category: "trek",
    duration: "3 Days / 2 Nights",
    price: 4999,
    priceLabel: "₹4,999",
    tagline:
      "The perfect weekend escape with forests, ridgelines and a glowing sunrise.",
    image: trekNagtibba,
    difficulty: "Easy",
    highlights: [
      "Weekend friendly",
      "Lush forest trails",
      "Golden sunrise views",
      "Camping experience",
    ],
  },
  {
    slug: "yulla-kanda",
    name: "Yulla Kanda Trek",
    category: "trek",
    duration: "4 Days / 3 Nights",
    price: 7499,
    priceLabel: "₹7,499",
    tagline:
      "A spiritual ridge walk to the highest Krishna temple in the Himalayas.",
    image: trekYulla,
    difficulty: "Moderate",
    highlights: [
      "Highest Krishna Temple",
      "Remote Himalayan route",
      "Camping under the peaks",
      "Rich local culture",
      "Scenic mountain views",
    ],
  },
];

export const trips: Package[] = [
  {
    slug: "hanol-cultural",
    name: "Hanol Cultural Trip",
    category: "trip",
    duration: "2 Days / 1 Night",
    price: 3999,
    priceLabel: "₹3,999",
    tagline:
      "Live like a local in the heritage village of Hanol along the Tons river.",
    image: tripHanol,
    highlights: [
      "Hanol village experience",
      "Traditional Garhwali culture",
      "Home-cooked local food",
      "Riverside landscapes",
      "Slow, intentional travel",
    ],
  },
  {
    slug: "mahasu-devta-yatra",
    name: "Mahasu Devta Yatra",
    category: "trip",
    duration: "3 Days / 2 Nights",
    price: 5499,
    priceLabel: "₹5,499",
    tagline:
      "A soulful circuit through Uttarakhand's sacred temples and timeless villages.",
    image: tripMahasu,
    route: [
      "Dehradun",
      "Hanol",
      "Mahasu Devta Temple",
      "Bisoi",
      "Lakhwar",
      "Lakhsiyar",
      "Dehradun",
    ],
    highlights: [
      "Religious & heritage tourism",
      "Visit to Mahasu Devta Temple",
      "Authentic village stays",
      "Scenic mountain drives",
      "Cultural local experiences",
    ],
  },
];

export const allPackages: Package[] = [...treks, ...trips];

export function findPackage(slug: string) {
  return allPackages.find((p) => p.slug === slug);
}

export const inclusions = [
  "Transportation from Dehradun",
  "Comfortable accommodation",
  "Local Garhwali meals",
  "Bonfire (where applicable)",
  "Experienced tour guide",
  "Dedicated group coordinator",
];
