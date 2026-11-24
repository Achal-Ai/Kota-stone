import type { Product, ProductSize, Specification } from '@/types'

/**
 * Complete product catalogue — 30 varieties across 5 categories, exactly as
 * listed in the supplied business profile.
 *
 * Sizes, thickness ranges, packaging and technical benchmarks are copied from
 * the PDF tables. Descriptive copy never introduces prices, certifications or
 * claims that are not in the profile.
 *
 * TODO(backend): this file becomes `services/api/productService.ts` →
 * `GET /api/products?category=&finish=&q=`.
 */

/* --------------------------------------------------------------------------
   Shared size / packaging tables (PDF §4 — Standard Sizes & Packaging)
   -------------------------------------------------------------------------- */

const calibratedTileSizes: ProductSize[] = [
  { label: '1 × 1 ft', metric: '300 × 300 mm', thickness: '16–20 mm' },
  { label: '2 × 1 ft', metric: '600 × 300 mm', thickness: '16–20 mm' },
  { label: '2 × 2 ft', metric: '600 × 600 mm', thickness: '16–20 mm' },
]

const kotaSlabSizes: ProductSize[] = [
  { label: '2 × 2 ft', metric: '610 × 610 mm', thickness: '18–25 mm' },
  { label: '3 × 2 ft', metric: '915 × 610 mm', thickness: '18–25 mm' },
  { label: '4 × 2 ft', metric: '1220 × 610 mm', thickness: '25–35 mm' },
  { label: '6 × 2 ft', metric: '1830 × 610 mm', thickness: '25–35 mm' },
]

const marbleGraniteSlabSizes: ProductSize[] = [
  { label: 'Cutter slab 6 × 3 ft', metric: '1830 × 915 mm', thickness: '15–18 mm' },
  { label: 'Gangsaw slab 8 × 4 ft', metric: '2440 × 1220 mm', thickness: '15–18 mm' },
  { label: 'Gangsaw slab 10 × 5 ft', metric: '3050 × 1525 mm', thickness: '15–18 mm' },
]

const parkingSizes: ProductSize[] = [
  { label: 'Tile 1 × 1 ft', metric: '300 × 300 mm', thickness: '25–40 mm' },
  { label: 'Tile 1.5 × 1.5 ft', metric: '450 × 450 mm', thickness: '25–40 mm' },
  { label: 'Tile 2 × 2 ft', metric: '600 × 600 mm', thickness: '25–40 mm' },
  { label: 'Cobble 4 × 4 in', metric: '100 × 100 mm', thickness: '50–75 mm' },
  { label: 'Cobble 6 × 6 in', metric: '150 × 150 mm', thickness: '50–75 mm' },
]

const claddingSizes: ProductSize[] = [
  { label: '2 × 12 in', metric: '50 × 300 mm', thickness: '12–18 mm' },
  { label: '3 × 18 in', metric: '75 × 450 mm', thickness: '12–18 mm' },
  { label: '4 × 24 in', metric: '100 × 600 mm', thickness: '12–18 mm' },
  { label: '6 × 24 in', metric: '150 × 600 mm', thickness: '12–18 mm' },
]

/* --------------------------------------------------------------------------
   Packaging (PDF §4)
   -------------------------------------------------------------------------- */

const packaging = {
  tiles: { en: 'Corrugated boxes / pallets', hi: 'कोरगेटेड बॉक्स / पैलेट' },
  kotaSlabs: { en: 'Loose truckload / wooden crates', hi: 'लूज़ ट्रकलोड / लकड़ी के क्रेट' },
  slabs: { en: 'Strapped bundles / wooden stands', hi: 'स्ट्रैप्ड बंडल / लकड़ी के स्टैंड' },
  parking: { en: 'Strapped pallets / jumbo bags', hi: 'स्ट्रैप्ड पैलेट / जंबो बैग' },
  cladding: { en: 'Wooden crates', hi: 'लकड़ी के क्रेट' },
}

/* --------------------------------------------------------------------------
   Technical specifications
   PDF §5 benchmarks apply to Kota Limestone. Marble & Granite rows carry only
   what the profile documents for them (format + thickness + packaging).
   -------------------------------------------------------------------------- */

const kotaSpecs: Specification[] = [
  {
    label: { en: 'Bulk density / specific gravity', hi: 'बल्क घनत्व / विशिष्ट गुरुत्व' },
    value: { en: '2,600 – 2,720 kg/m³ (2.60 – 2.72)', hi: '2,600 – 2,720 किग्रा/घनमीटर' },
  },
  {
    label: { en: 'Water absorption', hi: 'जल अवशोषण' },
    value: { en: '< 1.0% (0.40% – 0.95%) — highly resistant to dampness', hi: '< 1.0% (0.40% – 0.95%) — नमी से अत्यधिक प्रतिरोधी' },
  },
  {
    label: { en: 'Compressive strength', hi: 'संपीड़न शक्ति' },
    value: { en: '180 – 210 N/mm² — suitable for heavy forklift & vehicle loads', hi: '180 – 210 न्यूटन/मिमी² — भारी फ़ोर्कलिफ़्ट व वाहन भार हेतु उपयुक्त' },
  },
  {
    label: { en: 'Thermal behaviour', hi: 'तापीय व्यवहार' },
    value: { en: 'Low heat retention — keeps interiors naturally cool', hi: 'कम ताप संचयन — भीतरी स्थान ठंडे रखता है' },
  },
  {
    label: { en: 'Lifespan & re-polishability', hi: 'जीवनकाल व पुनः पॉलिश' },
    value: { en: '50+ years; full-body natural stone, re-polishable multiple times', hi: '50+ वर्ष; फ़ुल-बॉडी प्राकृतिक पत्थर, कई बार पुनः पॉलिश योग्य' },
  },
]

const formatSpecs = (rows: Array<[Specification['label'], Specification['value']]>): Specification[] =>
  rows.map(([label, value]) => ({ label, value }))

const kotaFormatSpecs = formatSpecs([
  [{ en: 'Format', hi: 'फ़ॉर्मेट' }, { en: 'Calibrated ready-to-fit tiles & gangsaw slabs', hi: 'कैलिब्रेटेड रेडी-टू-फ़िट टाइल्स व गैंगसॉ स्लैब' }],
  [{ en: 'Thickness', hi: 'मोटाई' }, { en: 'Tiles 16–20 mm uniform · Slabs 18–35 mm', hi: 'टाइल्स 16–20 मिमी · स्लैब 18–35 मिमी' }],
  [{ en: 'Installation', hi: 'स्थापना' }, { en: 'Calibrated tiles lay like ceramic using stone adhesive — saves up to 50% installation time & labour', hi: 'कैलिब्रेटेड टाइल्स स्टोन एडहेसिव से लगती हैं — 50% तक समय व श्रम की बचत' }],
])

const slabFormatSpecs = (kind: 'marble' | 'granite'): Specification[] =>
  formatSpecs([
    [{ en: 'Format', hi: 'फ़ॉर्मेट' }, { en: 'Standard cutter & gangsaw slabs (6 × 3 ft up to 10 × 5 ft)', hi: 'स्टैंडर्ड कटर व गैंगसॉ स्लैब (6 × 3 फ़्ट से 10 × 5 फ़्ट तक)' }],
    [{ en: 'Thickness', hi: 'मोटाई' }, { en: '15 – 18 mm', hi: '15 – 18 मिमी' }],
    [
      { en: 'Primary use', hi: 'मुख्य उपयोग' },
      kind === 'marble'
        ? { en: 'Luxury living rooms, pooja rooms, staircases, lobbies & wall dado', hi: 'लक्ज़री लिविंग रूम, पूजा कक्ष, सीढ़ियाँ, लॉबी व वॉल डैडो' }
        : { en: 'Kitchen counters, heavy-traffic floors, door/window frames & stairs', hi: 'किचन काउंटर, अधिक यातायात फ़र्श, दरवाज़ा-खिड़की फ़्रेम व सीढ़ियाँ' },
    ],
  ])

const parkingFormatSpecs = formatSpecs([
  [{ en: 'Format', hi: 'फ़ॉर्मेट' }, { en: 'Parking tiles 1×1 ft, 1.5×1.5 ft, 2×2 ft · Cobbles 4×4 in, 6×6 in', hi: 'पार्किंग टाइल्स व कॉबल्स — उपरोक्त मानक आकार' }],
  [{ en: 'Thickness', hi: 'मोटाई' }, { en: 'Tiles 25 – 40 mm · Cobbles 50 – 75 mm', hi: 'टाइल्स 25 – 40 मिमी · कॉबल्स 50 – 75 मिमी' }],
  [{ en: 'Engineered for', hi: 'निर्मित' }, { en: 'Driveways, parking lots, podiums, pathways, ramps & landscaping', hi: 'ड्राइववे, पार्किंग, पोडियम, पथ, रैम्प व लैंडस्केपिंग' }],
])

const claddingFormatSpecs = formatSpecs([
  [{ en: 'Format', hi: 'फ़ॉर्मेट' }, { en: 'Split / rock-face strips — 2×12 in up to 6×24 in', hi: 'स्प्लिट / रॉक-फ़ेस स्ट्रिप्स — 2×12 इंच से 6×24 इंच' }],
  [{ en: 'Thickness', hi: 'मोटाई' }, { en: '12 – 18 mm', hi: '12 – 18 मिमी' }],
  [{ en: 'Engineered for', hi: 'निर्मित' }, { en: 'Exterior elevations, boundary walls, pillars, resorts & heritage facades', hi: 'बाहरी ऊँचाई, बाउंड्री वॉल, स्तंभ, रिसॉर्ट व हेरिटेज फ़साड' }],
])

/* --------------------------------------------------------------------------
   Builder
   -------------------------------------------------------------------------- */

type ProductInput = Omit<
  Product,
  'id' | 'images' | 'createdAt' | 'specifications'
> & {
  image: string
  specs: Specification[]
  createdAt?: string
}

let autoId = 0
const build = (input: ProductInput): Product => {
  autoId += 1
  const { image, specs, createdAt, ...rest } = input
  return {
    ...rest,
    id: `prd-${String(autoId).padStart(3, '0')}`,
    images: [image],
    specifications: specs,
    createdAt: createdAt ?? '2026-01-15',
  }
}

const img = (slug: string) => `/images/products/${slug}.svg`

/* --------------------------------------------------------------------------
   1 · KOTA STONE — 5 shades
   -------------------------------------------------------------------------- */

const kotaFinishes = ['mirror-polish', 'semi-polish', 'honed', 'river-finish', 'shot-blasted'] as const

const kotaProducts: Product[] = [
  {
    name: { en: 'Kota Blue', hi: 'कोटा ब्लू' },
    shade: 'Kota Blue',
    summary: {
      en: 'The benchmark blue-grey Kota limestone — dense, uniform and the most specified shade for institutional and residential flooring.',
      hi: 'नीले-धूसर कोटा चूना पत्थर का मानक — घना, समान और संस्थागत व आवासीय फ़र्श के लिए सर्वाधिक अनुरोधित।',
    },
    description: {
      en: 'Kota Blue is the core of our Kota Stone line: a blue-grey limestone quarried in Rajasthan and processed on our gangsaw and calibration lines. Supplied as traditional flooring slabs for large-area economy or as machine-calibrated ready-to-fit tiles in uniform 16–20 mm thickness, pre-polished and box-packed. Multi-stage grading keeps colour tone and dimension consistent across the whole lot.',
      hi: 'कोटा ब्लू हमारी कोटा श्रृंखला का केंद्र है: राजस्थान से खनन किया गया नीला-धूसर चूना पत्थर, जिसे हमारी गैंगसॉ व कैलिब्रेशन लाइनों पर प्रोसेस किया जाता है। बड़े क्षेत्रफल की अर्थव्यवस्था हेतु पारंपरिक फ़र्श स्लैब, या 16–20 मिमी समान मोटाई वाली मशीन-कैलिब्रेटेड रेडी-टू-फ़िट टाइल्स के रूप में आपूर्ति।',
    },
    applications: [
      { en: 'Schools, hospitals & offices', hi: 'विद्यालय, अस्पताल व कार्यालय' },
      { en: 'Factories & godowns', hi: 'कारखाने व गोदाम' },
      { en: 'Corridors & residential flooring', hi: 'गलियारे व आवासीय फ़र्श' },
    ],
    finishes: [...kotaFinishes],
    sizes: [...calibratedTileSizes, ...kotaSlabSizes],
    thickness: 'Tiles 16–20 mm · Slabs 18–35 mm',
    packaging: packaging.tiles,
    specs: [...kotaSpecs, ...kotaFormatSpecs],
    image: img('kota-blue'),
    featured: true,
    inStock: true,
  },
  {
    name: { en: 'Kota Green', hi: 'कोटा ग्रीन' },
    shade: 'Kota Green',
    summary: {
      en: 'A green-toned Kota limestone prized for its calm, earthy field — popular in verandahs, sit-outs and landscape paving.',
      hi: 'हरे रंग का कोटा चूना पत्थर, शांत प्राकृतिक रंगत के लिए प्रसिद्ध — वरांडा, सिट-आउट व लैंडस्केप पेविंग में लोकप्रिय।',
    },
    description: {
      en: 'Kota Green brings a distinct green cast to the floor while retaining the same density, low water absorption and compressive strength that define the Kota family. Available in gangsaw slabs and calibrated tiles, with honed, river and shot-blasted finishes for indoor and outdoor duty.',
      hi: 'कोटा ग्रीन फ़र्श में विशिष्ट हरित रंगत लाता है और कोटा परिवार की वही घनत्व, कम जल अवशोषण व संपीड़न शक्ति बनाए रखता है। गैंगसॉ स्लैब व कैलिब्रेटेड टाइल्स उपलब्ध।',
    },
    applications: [
      { en: 'Verandahs & sit-outs', hi: 'वरांडा व सिट-आउट' },
      { en: 'Garden pathways', hi: 'गार्डन पथ' },
      { en: 'Indoor flooring with matte grip', hi: 'मैट ग्रिप के साथ इनडोर फ़र्श' },
    ],
    finishes: [...kotaFinishes],
    sizes: [...calibratedTileSizes, ...kotaSlabSizes],
    thickness: 'Tiles 16–20 mm · Slabs 18–35 mm',
    packaging: packaging.tiles,
    specs: [...kotaSpecs, ...kotaFormatSpecs],
    image: img('kota-green'),
    inStock: true,
  },
  {
    name: { en: 'Kota Brown', hi: 'कोटा ब्राउन' },
    shade: 'Kota Brown',
    summary: {
      en: 'Warm brown Kota with tonal movement — a natural fit for earth-toned interiors and covered outdoor areas.',
      hi: 'गर्म भूरे रंग का कोटा, प्राकृतिक रंग-भिन्नता के साथ — पृथ्वी-रंग इंटीरियर व आच्छादित बाहरी क्षेत्रों के लिए उपयुक्त।',
    },
    description: {
      en: 'Kota Brown is selected lot-wise for shade consistency so a full floor reads as one continuous tone. Supplied in slabs for large-area economy and in pre-polished calibrated tiles for fast, adhesive-based installation.',
      hi: 'कोटा ब्राउन को रंग-समानता हेतु लॉट-दर-लॉट छाँटा जाता है, ताकि पूरा फ़र्श एकसमान प्रतीत हो। बड़े क्षेत्रफल हेतु स्लैब व तेज़ स्थापना हेतु कैलिब्रेटेड टाइल्स।',
    },
    applications: [
      { en: 'Residential living areas', hi: 'आवासीय रहने के स्थान' },
      { en: 'Covered patios', hi: 'आच्छादित पैटियो' },
      { en: 'Commercial corridors', hi: 'व्यावसायिक गलियारे' },
    ],
    finishes: [...kotaFinishes],
    sizes: [...calibratedTileSizes, ...kotaSlabSizes],
    thickness: 'Tiles 16–20 mm · Slabs 18–35 mm',
    packaging: packaging.tiles,
    specs: [...kotaSpecs, ...kotaFormatSpecs],
    image: img('kota-brown'),
    inStock: true,
  },
  {
    name: { en: 'Honey Yellow', hi: 'हनी येलो' },
    shade: 'Honey Yellow',
    summary: {
      en: 'Golden-yellow Kota shade that lifts light in low-lit corridors and institutional buildings.',
      hi: 'सुनहरा-पीला कोटा रंग, कम रोशनी वाले गलियारों व संस्थागत भवनों में प्रकाश बढ़ाता है।',
    },
    description: {
      en: 'Honey Yellow is a warm, high-visibility Kota variety used where a bright, welcoming floor is required without sacrificing the hardness and low absorption of the base stone.',
      hi: 'हनी येलो एक गर्म, उच्च-दृश्यता वाली कोटा किस्म है, जहाँ चमकदार स्वागतयोग्य फ़र्श चाहिए पर पत्थर की कठोरता व कम अवशोषण बना रहे।',
    },
    applications: [
      { en: 'Institutional buildings', hi: 'संस्थागत भवन' },
      { en: 'Bright residential lobbies', hi: 'प्रकाशमान आवासीय लॉबी' },
      { en: 'Staircases & landings', hi: 'सीढ़ियाँ व लैंडिंग' },
    ],
    finishes: [...kotaFinishes],
    sizes: [...calibratedTileSizes, ...kotaSlabSizes],
    thickness: 'Tiles 16–20 mm · Slabs 18–35 mm',
    packaging: packaging.tiles,
    specs: [...kotaSpecs, ...kotaFormatSpecs],
    image: img('honey-yellow'),
    inStock: true,
  },
  {
    name: { en: 'Charcoal Grey', hi: 'चारकोल ग्रे' },
    shade: 'Charcoal Grey',
    summary: {
      en: 'Deep charcoal Kota for contrast bands, ramps and contemporary monochrome schemes.',
      hi: 'गहरा चारकोल कोटा — कंट्रास्ट बैंड, रैम्प व समकालीन एक-रंग योजनाओं के लिए।',
    },
    description: {
      en: 'Charcoal Grey delivers the darkest tone in the Kota range. Its shot-blasted and river finishes make it a dependable anti-skid choice for ramps and wet areas, while mirror polish suits feature flooring.',
      hi: 'चारकोल ग्रे कोटा श्रृंखला में सबसे गहरा रंग देता है। शॉट-ब्लास्टेड व रिवर फ़िनिश इसे रैम्प व गीले स्थानों के लिए भरोसेमंद एंटी-स्किड विकल्प बनाते हैं।',
    },
    applications: [
      { en: 'Ramps & wet areas', hi: 'रैम्प व गीले स्थान' },
      { en: 'Contemporary flooring', hi: 'समकालीन फ़र्श' },
      { en: 'Contrast skirting bands', hi: 'कंट्रास्ट स्कर्टिंग बैंड' },
    ],
    finishes: [...kotaFinishes],
    sizes: [...calibratedTileSizes, ...kotaSlabSizes],
    thickness: 'Tiles 16–20 mm · Slabs 18–35 mm',
    packaging: packaging.tiles,
    specs: [...kotaSpecs, ...kotaFormatSpecs],
    image: img('charcoal-grey'),
    inStock: true,
  },
].map((p) =>
  build({
    ...p,
    categorySlug: 'kota-stone',
    slug: p.shade.toLowerCase().replace(/\s+/g, '-'),
    packaging: p.packaging,
    specs: p.specs,
    thickness: p.thickness,
  } as ProductInput),
)

/* --------------------------------------------------------------------------
   2 · INDIAN MARBLE — 8 varieties
   -------------------------------------------------------------------------- */

const marbleInput = (
  name: string,
  shade: string,
  summary: string,
  description: string,
  applications: string[],
  imageSlug: string,
  featured = false,
): ProductInput => ({
  categorySlug: 'indian-marble',
  slug: imageSlug,
  name: { en: name },
  shade,
  summary: { en: summary },
  description: { en: description },
  applications: applications.map((a) => ({ en: a })),
  finishes: ['mirror-polish', 'semi-polish', 'honed'],
  sizes: [...marbleGraniteSlabSizes],
  thickness: '15 – 18 mm',
  packaging: packaging.slabs,
  specs: slabFormatSpecs('marble'),
  image: img(imageSlug),
  featured,
  inStock: true,
})

const marbleProducts: Product[] = [
  marbleInput(
    'Makrana White',
    'Makrana White',
    'The classic Indian white marble — pure, luminous and chosen for temple work and luxury interiors.',
    'Makrana White is one of the most recognised Indian marbles, quarried at Makrana and supplied as cutter and gangsaw slabs in 15–18 mm. Its clean white field suits pooja rooms, temple work, lobbies and staircases where a bright, consistent floor is specified.',
    ['Luxury living rooms', 'Pooja rooms & temple work', 'Staircases & lobbies', 'Wall dado'],
    'makrana-white',
    true,
  ),
  marbleInput(
    'Dungri',
    'Dungri',
    'A durable white-to-cream marble workhorse for large residential and commercial floors.',
    'Dungri is a dependable white marble variety valued for coverage on large floor plates. Supplied in standard cutter and gangsaw slabs with strapped bundle packaging, it is graded lot-wise so shade stays uniform across an entire floor.',
    ['Large residential floors', 'Commercial lobbies', 'Staircases'],
    'dungri',
  ),
  marbleInput(
    'Albeta',
    'Albeta',
    'Soft white marble with delicate veining for elegant, light-filled interiors.',
    'Albeta offers a gentle white surface with subtle natural movement, finished to mirror polish for living rooms and wall dado. Slabs are dimension-checked before dispatch for accurate on-site coverage.',
    ['Living rooms', 'Wall dado', 'Lobby cladding'],
    'albeta',
  ),
  marbleInput(
    'Morwad White',
    'Morwad White',
    'Bright, clean white marble favoured for pooja rooms and premium flooring.',
    'Morwad White is selected for its bright, even tone. Supplied in 15–18 mm slabs, it is polished on multi-head lines and inspected for colour consistency before bundling.',
    ['Pooja rooms', 'Premium flooring', 'Temple work'],
    'morwad-white',
    true,
  ),
  marbleInput(
    'Rajnagar White',
    'Rajnagar White',
    'A versatile white marble for lobbies, stairs and large-scale commercial specification.',
    'Rajnagar White covers lobbies, staircases and commercial floors with a consistent light field. Available as cutter and gangsaw slabs, graded for shade so multi-floor projects read as one surface.',
    ['Lobbies', 'Staircases', 'Commercial floors'],
    'rajnagar-white',
  ),
  marbleInput(
    'Katni Beige',
    'Katni Beige',
    'Warm beige marble that pairs naturally with timber and bronze-toned interiors.',
    'Katni Beige brings a warm, neutral tone to floors and staircases. Supplied in standard slab formats with strapped bundle packaging for safe transport.',
    ['Warm-toned interiors', 'Staircases', 'Flooring'],
    'katni-beige',
  ),
  marbleInput(
    'Wonder Marble',
    'Wonder Marble',
    'A characterful Indian marble for feature flooring and statement lobbies.',
    'Wonder Marble is specified where a distinctive natural pattern is wanted without losing dimensional accuracy. Slabs are calibrated for thickness before dispatch.',
    ['Feature flooring', 'Statement lobbies', 'Wall dado'],
    'wonder-marble',
  ),
  marbleInput(
    'Banswara Purple',
    'Banswara Purple',
    'Distinctive purple-toned marble from Banswara for bold architectural statements.',
    'Banswara Purple is recognised by its purple hue and natural patterning. Supplied in cutter and gangsaw slabs for feature floors, staircases and dado work where a unique stone is called for.',
    ['Feature floors', 'Staircases', 'Dado work'],
    'banswara-purple',
    true,
  ),
].map((p) => build(p))

/* --------------------------------------------------------------------------
   3 · GRANITE — 7 varieties
   -------------------------------------------------------------------------- */

const graniteInput = (
  name: string,
  shade: string,
  summary: string,
  description: string,
  applications: string[],
  imageSlug: string,
  featured = false,
): ProductInput => ({
  categorySlug: 'granite',
  slug: imageSlug,
  name: { en: name },
  shade,
  summary: { en: summary },
  description: { en: description },
  applications: applications.map((a) => ({ en: a })),
  finishes: ['mirror-polish', 'semi-polish', 'honed'],
  sizes: [...marbleGraniteSlabSizes],
  thickness: '15 – 18 mm',
  packaging: packaging.slabs,
  specs: slabFormatSpecs('granite'),
  image: img(imageSlug),
  featured,
  inStock: true,
})

const graniteProducts: Product[] = [
  graniteInput(
    'Rajasthan Black',
    'Rajasthan Black',
    'The definitive Indian black granite — deep, uniform and built for heavy traffic.',
    'Rajasthan Black is the reference dark granite for kitchen countertops, commercial floors and staircases. Supplied as cutter and gangsaw slabs in 15–18 mm with mirror polish available on multi-head lines.',
    ['Kitchen countertops', 'Heavy-traffic commercial floors', 'Stairs'],
    'rajasthan-black',
    true,
  ),
  graniteInput(
    'Lakha Red',
    'Lakha Red',
    'Rich red granite with warm depth for counters, cladding and staircases.',
    'Lakha Red offers a saturated red field with granite durability. Slabs are graded for shade uniformity and strapped on wooden stands for transit.',
    ['Countertops', 'Wall cladding', 'Staircases'],
    'lakha-red',
  ),
  graniteInput(
    'Chima Pink',
    'Chima Pink',
    'Soft pink granite that warms up residential kitchens and lobbies.',
    'Chima Pink is a lighter granite tone suited to kitchens, lobbies and door/window frames where a warmer surface is desired.',
    ['Kitchens', 'Lobbies', 'Door & window frames'],
    'chima-pink',
  ),
  graniteInput(
    'Jhansi Red',
    'Jhansi Red',
    'Classic red granite for commercial floors and exterior architectural use.',
    'Jhansi Red is a widely specified red granite for high-traffic floors and architectural elements. Supplied in standard slab formats with thickness verified before dispatch.',
    ['Commercial floors', 'Exterior architecture', 'Stairs'],
    'jhansi-red',
  ),
  graniteInput(
    'Tiger Skin',
    'Tiger Skin',
    'Bold patterned granite — a natural statement stone for feature surfaces.',
    'Tiger Skin is selected for its distinctive banded pattern. Because movement varies from slab to slab, we encourage sample dispatch and video inspection before confirming a lot.',
    ['Feature countertops', 'Statement flooring', 'Cladding'],
    'tiger-skin',
    true,
  ),
  graniteInput(
    'Rosy Pink',
    'Rosy Pink',
    'Even-toned pink granite for consistent large-area flooring.',
    'Rosy Pink provides a uniform pink field across large floor plates, making it a practical choice for commercial specifications requiring shade consistency.',
    ['Large-area flooring', 'Commercial interiors', 'Staircases'],
    'rosy-pink',
  ),
  graniteInput(
    'South Black',
    'South Black',
    'Dense black granite for counters, floors and exterior details.',
    'South Black is a hard-wearing dark granite suited to countertops, heavy-traffic floors and exterior architectural details.',
    ['Countertops', 'Heavy-traffic floors', 'Exterior details'],
    'south-black',
  ),
].map((p) => build(p))

/* --------------------------------------------------------------------------
   4 · PARKING & OUTDOOR STONES — 5
   -------------------------------------------------------------------------- */

const parkingInput = (
  name: string,
  shade: string,
  summary: string,
  description: string,
  applications: string[],
  imageSlug: string,
  sizes: ProductSize[],
  thickness: string,
  featured = false,
): ProductInput => ({
  categorySlug: 'parking-outdoor',
  slug: imageSlug,
  name: { en: name },
  shade,
  summary: { en: summary },
  description: { en: description },
  applications: applications.map((a) => ({ en: a })),
  finishes: ['shot-blasted', 'river-finish', 'honed'],
  sizes,
  thickness,
  packaging: packaging.parking,
  specs: parkingFormatSpecs,
  image: img(imageSlug),
  featured,
  inStock: true,
})

const parkingProducts: Product[] = [
  parkingInput(
    'Kota Parking Tiles',
    'Kota Parking Tiles',
    'Heavy-duty calibrated Kota tiles in 25–40 mm for driveways and parking lots.',
    'Kota Parking Tiles reuse the Kota limestone body in a thicker, anti-skid format engineered for vehicle load. Available in 1×1 ft, 1.5×1.5 ft and 2×2 ft with shot-blasted or river finish for traction.',
    ['Driveways', 'Residential & commercial parking', 'Podiums'],
    'kota-parking-tiles',
    [parkingSizes[0], parkingSizes[1], parkingSizes[2]],
    '25 – 40 mm',
    true,
  ),
  parkingInput(
    'Black Basalt',
    'Black Basalt',
    'Dense dark basalt for premium exterior paving, pathways and landscape edges.',
    'Black Basalt is a dark, high-durability outdoor stone used for driveways, pathways and podium paving where a refined, contemporary dark surface is required.',
    ['Driveways & pathways', 'Podium paving', 'Landscape edges'],
    'black-basalt',
    [parkingSizes[0], parkingSizes[2], parkingSizes[3], parkingSizes[4]],
    '25 – 75 mm',
  ),
  parkingInput(
    'Red Mandana',
    'Red Mandana',
    'Traditional red Mandana stone for courtyards, pathways and rustic landscapes.',
    'Red Mandana is a classic Rajasthani outdoor stone with a warm red tone, laid in courtyards, garden pathways and traditional landscape schemes.',
    ['Courtyards', 'Garden pathways', 'Traditional landscapes'],
    'red-mandana',
    [parkingSizes[0], parkingSizes[2], parkingSizes[3]],
    '25 – 75 mm',
  ),
  parkingInput(
    'Chequered & Grooved Stones',
    'Chequered and Grooved Stones',
    'Textured chequered and grooved surfaces that grip under tyres and foot traffic.',
    'Chequered and grooved stones are cut for explicit anti-skid performance on ramps, parking bays and slope approaches, in Kota and other dense stones.',
    ['Ramps & slopes', 'Parking bays', 'Wet zones'],
    'chequered-grooved',
    [parkingSizes[0], parkingSizes[2]],
    '25 – 40 mm',
  ),
  parkingInput(
    'Cobbles',
    'Cobbles',
    'Chunky 4×4 in and 6×6 in cobbles for driveways, edges and garden paving.',
    'Cobbles are supplied in 4×4 in and 6×6 in at 50–75 mm thickness for driveways, borders and landscape paving, packed in strapped pallets or jumbo bags.',
    ['Driveways', 'Borders & edging', 'Garden paving'],
    'cobbles',
    [parkingSizes[3], parkingSizes[4]],
    '50 – 75 mm',
  ),
].map((p) => build(p))

/* --------------------------------------------------------------------------
   5 · SANDSTONE & WALL CLADDING — 5
   -------------------------------------------------------------------------- */

const sandstoneInput = (
  name: string,
  shade: string,
  summary: string,
  description: string,
  applications: string[],
  imageSlug: string,
  featured = false,
): ProductInput => ({
  categorySlug: 'sandstone-cladding',
  slug: imageSlug,
  name: { en: name },
  shade,
  summary: { en: summary },
  description: { en: description },
  applications: applications.map((a) => ({ en: a })),
  finishes: ['river-finish', 'shot-blasted', 'honed'],
  sizes: [...claddingSizes],
  thickness: '12 – 18 mm',
  packaging: packaging.cladding,
  specs: claddingFormatSpecs,
  image: img(imageSlug),
  featured,
  inStock: true,
})

const sandstoneProducts: Product[] = [
  sandstoneInput(
    'Dholpur Beige / Pink',
    'Dholpur Beige / Pink',
    'The workhorse Indian sandstone for elevations, boundary walls and cladding.',
    'Dholpur Beige and Pink sandstones are supplied as split and rock-face strips in 12–18 mm for exterior house elevations, boundary walls and pillars, packed in wooden crates.',
    ['Exterior elevations', 'Boundary walls', 'Pillars'],
    'dholpur-beige',
    true,
  ),
  sandstoneInput(
    'Jodhpur Pink',
    'Jodhpur Pink',
    'Warm pink sandstone with a soft, sun-washed character for heritage facades.',
    'Jodhpur Pink is a warm pink sandstone used on resort and heritage facades where a sun-washed, aged appearance is wanted from day one.',
    ['Resort facades', 'Heritage restoration', 'Cladding'],
    'jodhpur-pink',
  ),
  sandstoneInput(
    'Teakwood Sandstone',
    'Teakwood Sandstone',
    'Sandstone with linear, timber-like banding — the look of wood in natural stone.',
    'Teakwood Sandstone features linear grain resembling timber, making it a favourite for feature walls, pillars and exterior elevations that want warmth without timber maintenance.',
    ['Feature walls', 'Pillars', 'Exterior elevations'],
    'teakwood-sandstone',
    true,
  ),
  sandstoneInput(
    'Rainbow Sandstone',
    'Rainbow Sandstone',
    'Multi-banded sandstone that creates dramatic, one-of-a-kind elevations.',
    'Rainbow Sandstone carries natural banding in several tones. Movement varies between strips, so we recommend sample dispatch and live video verification before confirming quantity.',
    ['Statement elevations', 'Boundary walls', 'Resort exteriors'],
    'rainbow-sandstone',
  ),
  sandstoneInput(
    'Rock-Face Strips',
    'Rock-Face Strips',
    'Rough rock-face strips for textured, shadow-catching wall cladding.',
    'Rock-Face Strips are split to leave a rugged, projecting face that throws natural shadow across a facade. Supplied in 2×12 in up to 6×24 in at 12–18 mm in wooden crates.',
    ['Textured wall cladding', 'Boundary walls', 'Pillar facing'],
    'rock-face-strips',
  ),
].map((p) => build(p))

/* -------------------------------------------------------------------------- */

export const products: Product[] = [
  ...kotaProducts,
  ...marbleProducts,
  ...graniteProducts,
  ...parkingProducts,
  ...sandstoneProducts,
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)

export const featuredProducts = products.filter((p) => p.featured)

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit)

export const productsByCategory = (categorySlug: string): Product[] =>
  products.filter((p) => p.categorySlug === categorySlug)
