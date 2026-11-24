import type { Category } from '@/types'

/**
 * The five product categories from the business profile.
 * Copy is taken directly from the supplied PDF — no invented claims.
 */
export const categories: Category[] = [
  {
    id: 'cat-kota',
    slug: 'kota-stone',
    name: { en: 'Kota Stone', hi: 'कोटा स्टोन' },
    tagline: { en: 'Slabs & Calibrated Tiles', hi: 'स्लैब व कैलिब्रेटेड टाइल्स' },
    description: {
      en: 'Rajasthan Kota Stone supplied in both traditional gangsaw slabs and machine-calibrated ready-to-fit tiles — Kota Blue, Kota Green, Kota Brown, Honey Yellow and Charcoal Grey.',
      hi: 'राजस्थानी कोटा पत्थर पारंपरिक गैंगसॉ स्लैब और मशीन-कैलिब्रेटेड रेडी-टू-फिट टाइल्स — दोनों रूपों में उपलब्ध।',
    },
    applications: [
      { en: 'Residential homes', hi: 'आवासीय घर' },
      { en: 'Schools & hospitals', hi: 'विद्यालय एवं अस्पताल' },
      { en: 'Offices & factories', hi: 'कार्यालय एवं कारखाने' },
      { en: 'Godowns & corridors', hi: 'गोदाम एवं गलियारे' },
    ],
    image: '/images/categories/kota-stone.svg',
    bannerImage: '/images/categories/kota-stone.svg',
    sortOrder: 1,
  },
  {
    id: 'cat-marble',
    slug: 'indian-marble',
    name: { en: 'Indian Marble', hi: 'भारतीय मार्बल' },
    tagline: { en: 'Eight Signature Varieties', hi: 'आठ चुनिंदा किस्में' },
    description: {
      en: 'Makrana White, Dungri, Albeta, Morwad White, Rajnagar White, Katni Beige, Wonder Marble and Banswara Purple for luxury interiors and temple work.',
      hi: 'मकराना व्हाइट, डुंगरी, अलबेटा, मोरवाड़ व्हाइट, राजनगर व्हाइट, कटनी बेज, वंडर मार्बल और बांसवारा पर्पल।',
    },
    applications: [
      { en: 'Luxury living rooms', hi: 'लक्ज़री लिविंग रूम' },
      { en: 'Pooja rooms & temples', hi: 'पूजा कक्ष एवं मंदिर' },
      { en: 'Staircases & lobbies', hi: 'सीढ़ियाँ एवं लॉबी' },
      { en: 'Wall dado', hi: 'वॉल डैडो' },
    ],
    image: '/images/categories/indian-marble.svg',
    bannerImage: '/images/categories/indian-marble.svg',
    sortOrder: 2,
  },
  {
    id: 'cat-granite',
    slug: 'granite',
    name: { en: 'Granite', hi: 'ग्रेनाइट' },
    tagline: { en: 'Slabs & Tiles', hi: 'स्लैब व टाइल्स' },
    description: {
      en: 'Rajasthan Black, Lakha Red, Chima Pink, Jhansi Red, Tiger Skin, Rosy Pink and South Black Granite for counters, heavy-traffic floors and staircases.',
      hi: 'राजस्थान ब्लैक, लाखा रेड, चिमा पिंक, झाँसी रेड, टाइगर स्किन, रोज़ी पिंक और साउथ ब्लैक ग्रेनाइट।',
    },
    applications: [
      { en: 'Kitchen countertops', hi: 'किचन काउंटरटॉप' },
      { en: 'Heavy-traffic commercial floors', hi: 'अधिक यातायात वाले व्यावसायिक फ़र्श' },
      { en: 'Door & window frames', hi: 'दरवाज़ा एवं खिड़की फ़्रेम' },
      { en: 'Stairs', hi: 'सीढ़ियाँ' },
    ],
    image: '/images/categories/granite.svg',
    bannerImage: '/images/categories/granite.svg',
    sortOrder: 3,
  },
  {
    id: 'cat-parking',
    slug: 'parking-outdoor',
    name: { en: 'Parking & Outdoor Stones', hi: 'पार्किंग एवं आउटडोर स्टोन' },
    tagline: { en: 'Heavy-Duty Exterior Range', hi: 'हैवी-ड्यूटी बाहरी श्रृंखला' },
    description: {
      en: 'Kota Parking Tiles, Black Basalt, Red Mandana, Chequered & Grooved Stones and Cobbles engineered for driveways, podiums and landscaping.',
      hi: 'कोटा पार्किंग टाइल्स, ब्लैक बेसाल्ट, रेड मंदाना, चेकर्ड व ग्रूव्ड स्टोन और कॉबल्स।',
    },
    applications: [
      { en: 'Driveways & parking lots', hi: 'ड्राइववे एवं पार्किंग' },
      { en: 'Podiums & pathways', hi: 'पोडियम एवं पथ' },
      { en: 'Garden landscaping', hi: 'गार्डन लैंडस्केपिंग' },
      { en: 'Ramps & pool decks', hi: 'रैम्प एवं पूल डेक' },
    ],
    image: '/images/categories/parking-outdoor.svg',
    bannerImage: '/images/categories/parking-outdoor.svg',
    sortOrder: 4,
  },
  {
    id: 'cat-sandstone',
    slug: 'sandstone-cladding',
    name: { en: 'Sandstone & Wall Cladding', hi: 'सैंडस्टोन एवं वॉल क्लैडिंग' },
    tagline: { en: 'Facades, Pillars & Boundaries', hi: 'फ़साड, स्तंभ एवं बाउंड्री' },
    description: {
      en: 'Dholpur Beige/Pink, Jodhpur Pink, Teakwood Sandstone, Rainbow Sandstone and Rock-Face Strips for exterior elevations and heritage facades.',
      hi: 'धौलपुर बेज/पिंक, जोधपुर पिंक, टीकवुड सैंडस्टोन, रेनबो सैंडस्टोन और रॉक-फ़ेस स्ट्रिप्स।',
    },
    applications: [
      { en: 'Exterior house elevations', hi: 'बाहरी घर की ऊँचाई' },
      { en: 'Boundary walls & pillars', hi: 'बाउंड्री वॉल एवं स्तंभ' },
      { en: 'Resorts & heritage facades', hi: 'रिसॉर्ट एवं हेरिटेज फ़साड' },
      { en: 'Architectural wall cladding', hi: 'वास्तुकला वॉल क्लैडिंग' },
    ],
    image: '/images/categories/sandstone-cladding.svg',
    bannerImage: '/images/categories/sandstone-cladding.svg',
    sortOrder: 5,
  },
]

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug)
