import type { Banner, Inquiry, SiteStat } from '@/types'

/* --------------------------------------------------------------------------
   Homepage proof stats — PDF §1
   -------------------------------------------------------------------------- */

export const siteStats: SiteStat[] = [
  { id: 'st-1', value: '100%', label: { en: 'Natural', hi: '100% प्राकृतिक' } },
  { id: 'st-2', value: 'Quarry-Direct', label: { en: 'Stone', hi: 'पत्थर' } },
  { id: 'st-3', value: 'All Varieties', label: { en: 'Kota, Marble & Granite', hi: 'कोटा, मार्बल व ग्रेनाइट' } },
  { id: 'st-4', value: 'Precision Cut', label: { en: 'Calibrated & Polished', hi: 'कैलिब्रेटेड व पॉलिश्ड' } },
  { id: 'st-5', value: 'Pan-India', label: { en: 'Safe Truckload Supply', hi: 'सुरक्षित ट्रकलोड आपूर्ति' } },
]

/* --------------------------------------------------------------------------
   Why partner with us — PDF §7 (verbatim points)
   -------------------------------------------------------------------------- */

export interface WhyPoint {
  id: string
  index: string
  title: { en: string; hi: string }
  body: { en: string; hi: string }
}

export const whyPoints: WhyPoint[] = [
  {
    id: 'why-1',
    index: '01',
    title: { en: 'One-Stop Natural Stone Hub', hi: 'वन-स्टॉप प्राकृतिक पत्थर हब' },
    body: {
      en: 'Source Kota Stone, Marble, Granite, Sandstone and Parking Stones under one roof — saving coordination and freight costs.',
      hi: 'कोटा, मार्बल, ग्रेनाइट, सैंडस्टोन व पार्किंग स्टोन एक ही छत के नीचे — समन्वय व फ़्रेट लागत में बचत।',
    },
  },
  {
    id: 'why-2',
    index: '02',
    title: { en: 'Factory-Direct Wholesale Rates', hi: 'फ़ैक्ट्री-डायरेक्ट होलसेल रेट' },
    body: {
      en: 'Direct procurement from Rajasthan quarries and processing plants ensures honest, middleman-free pricing.',
      hi: 'राजस्थान के खदानों व प्रोसेसिंग प्लांटों से सीधी खरीद — ईमानदार, बिचौलिया-रहित मूल्य।',
    },
  },
  {
    id: 'why-3',
    index: '03',
    title: { en: 'Zero Compromise on Measurement', hi: 'नाप में शून्य समझौता' },
    body: {
      en: 'Transparent square-footage measurement and calibrated thickness accuracy on every order.',
      hi: 'हर ऑर्डर में पारदर्शी वर्ग-फ़ुट नाप और कैलिब्रेटेड मोटाई की सटीकता।',
    },
  },
  {
    id: 'why-4',
    index: '04',
    title: { en: 'Timely Dispatch Commitment', hi: 'समय पर डिस्पैच प्रतिबद्धता' },
    body: {
      en: 'Ready buffer stock of fast-moving sizes and finishes to keep your construction schedule on track.',
      hi: 'तेज़ी से बिकने वाले आकार व फ़िनिश का तैयार बफ़र स्टॉक — निर्माण समय-सारणी सुरक्षित।',
    },
  },
]

/* --------------------------------------------------------------------------
   Quality benchmarks — PDF §5 (Kota Limestone)
   -------------------------------------------------------------------------- */

export interface QualityRow {
  id: string
  parameter: { en: string; hi: string }
  standard: { en: string; hi: string }
}

export const qualityBenchmarks: QualityRow[] = [
  {
    id: 'q-1',
    parameter: { en: 'Bulk density / specific gravity', hi: 'बल्क घनत्व / विशिष्ट गुरुत्व' },
    standard: { en: '2,600 – 2,720 kg/m³  (2.60 – 2.72)', hi: '2,600 – 2,720 किग्रा/घनमीटर' },
  },
  {
    id: 'q-2',
    parameter: { en: 'Water absorption', hi: 'जल अवशोषण' },
    standard: { en: '< 1.0%   (0.40% – 0.95%, highly resistant to dampness)', hi: '< 1.0%   (0.40% – 0.95%, नमी से अत्यधिक प्रतिरोधी)' },
  },
  {
    id: 'q-3',
    parameter: { en: 'Compressive strength', hi: 'संपीड़न शक्ति' },
    standard: { en: '180 – 210 N/mm²  (suitable for heavy forklift & vehicle loads)', hi: '180 – 210 न्यूटन/मिमी²  (भारी फ़ोर्कलिफ़्ट व वाहन हेतु)' },
  },
  {
    id: 'q-4',
    parameter: { en: 'Thermal behaviour', hi: 'तापीय व्यवहार' },
    standard: { en: 'Low heat retention; keeps interiors naturally cool', hi: 'कम ताप संचयन; भीतरी स्थान प्राकृतिक रूप से ठंडे' },
  },
  {
    id: 'q-5',
    parameter: { en: 'Lifespan & re-polishability', hi: 'जीवनकाल व पुनः पॉलिश' },
    standard: { en: '50+ years; full-body stone, re-polishable multiple times', hi: '50+ वर्ष; फ़ुल-बॉडी पत्थर, कई बार पुनः पॉलिश योग्य' },
  },
]

/* --------------------------------------------------------------------------
   Manufacturing & processing capabilities (PDF §1, §3)
   -------------------------------------------------------------------------- */

export interface ProcessStep {
  id: string
  index: string
  title: { en: string; hi: string }
  body: { en: string; hi: string }
}

export const processSteps: ProcessStep[] = [
  {
    id: 'pr-1',
    index: '01',
    title: { en: 'Quarry-Direct Sourcing', hi: 'क्वारी-डायरेक्ट सोर्सिंग' },
    body: {
      en: 'Blocks are secured through direct sourcing relationships at Rajasthan quarry and processing hubs — no middlemen between the stone and your order.',
      hi: 'ब्लॉक राजस्थान के खदान व प्रोसेसिंग हबों से प्रत्यक्ष संबंधों द्वारा प्राप्त किए जाते हैं — पत्थर और आपके ऑर्डर के बीच कोई बिचौलिया नहीं।',
    },
  },
  {
    id: 'pr-2',
    index: '02',
    title: { en: 'Precision Cutting & Calibration', hi: 'सटीक कटिंग व कैलिब्रेशन' },
    body: {
      en: 'Modern gangsaw and multi-blade lines cut slabs and tiles to accurate dimensions, with machine calibration delivering uniform 16–20 mm ready-to-fit tiles.',
      hi: 'आधुनिक गैंगसॉ व मल्टी-ब्लेड लाइनें सटीक माप में स्लैब व टाइल्स काटती हैं; मशीन कैलिब्रेशन से 16–20 मिमी समान रेडी-टू-फ़िट टाइल्स बनती हैं।',
    },
  },
  {
    id: 'pr-3',
    index: '03',
    title: { en: 'Finishing & Multi-Stage Grading', hi: 'फ़िनिशिंग व बहु-चरण ग्रेडिंग' },
    body: {
      en: 'Mirror polish, semi-polish, honed, river and shot-blasted finishes are applied in-house, followed by strict lot-wise grade and shade sorting.',
      hi: 'मिरर पॉलिश, सेमी-पॉलिश, होन्ड, रिवर व शॉट-ब्लास्टेड फ़िनिश इन-हाउस लागू होते हैं, फिर कड़ी लॉट-दर-लॉट ग्रेड व शेड सॉर्टिंग होती है।',
    },
  },
  {
    id: 'pr-4',
    index: '04',
    title: { en: 'Packing & Pan-India Dispatch', hi: 'पैकिंग व पैन-इंडिया डिस्पैच' },
    body: {
      en: 'Corrugated boxes, wooden crates, strapped pallets and protective separators prepare each load for damage-free doorstep delivery across India.',
      hi: 'कोरगेटेड बॉक्स, लकड़ी के क्रेट, स्ट्रैप्ड पैलेट व सुरक्षात्मक सेपरेटर से हर लोड भारत भर में नुक़सान-रहित डोरस्टेप डिलीवरी हेतु तैयार होता है।',
    },
  },
]

/* --------------------------------------------------------------------------
   Applications & inspiration tabs
   -------------------------------------------------------------------------- */

export interface ApplicationTab {
  id: string
  label: { en: string; hi: string }
  title: { en: string; hi: string }
  body: { en: string; hi: string }
  categories: string[]
  image: string
}

export const applicationTabs: ApplicationTab[] = [
  {
    id: 'app-flooring',
    label: { en: 'Interior Flooring', hi: 'इंटीरियर फ़र्श' },
    title: { en: 'Floors that hold a building together', hi: 'जो भवन को एकसूत्र में बाँधें' },
    body: {
      en: 'Kota Stone and Indian Marble for living rooms, lobbies, schools, hospitals and offices — uniform shade, calibrated thickness and finishes matched to the traffic each floor carries.',
      hi: 'लिविंग रूम, लॉबी, विद्यालय, अस्पताल व कार्यालय हेतु कोटा व भारतीय मार्बल — एकसमान शेड, कैलिब्रेटेड मोटाई और यातायात अनुरूप फ़िनिश।',
    },
    categories: ['kota-stone', 'indian-marble'],
    image: '/images/applications/flooring.svg',
  },
  {
    id: 'app-outdoor',
    label: { en: 'Parking & Outdoor', hi: 'पार्किंग व आउटडोर' },
    title: { en: 'Built to carry vehicles, not just footfall', hi: 'केवल पैदल नहीं, वाहनों का भार सहने के लिए' },
    body: {
      en: 'Kota Parking Tiles, Black Basalt, Red Mandana, chequered stones and cobbles at 25–75 mm for driveways, podiums, ramps and landscaping — with anti-skid finishes where grip matters.',
      hi: 'ड्राइववे, पोडियम, रैम्प व लैंडस्केपिंग हेतु 25–75 मिमी की कोटा पार्किंग टाइल्स, ब्लैक बेसाल्ट, रेड मंदाना, चेकर्ड स्टोन व कॉबल्स — जहाँ पकड़ ज़रूरी, वहाँ एंटी-स्किड फ़िनिश।',
    },
    categories: ['parking-outdoor'],
    image: '/images/applications/parking.svg',
  },
  {
    id: 'app-elevation',
    label: { en: 'Elevation & Cladding', hi: 'ऊँचाई व क्लैडिंग' },
    title: { en: 'Facades with natural depth and shadow', hi: 'प्राकृतिक गहराई व छाया वाले फ़साड' },
    body: {
      en: 'Dholpur, Jodhpur Pink, Teakwood, Rainbow sandstone and rock-face strips for exterior elevations, boundary walls, pillars, resorts and heritage facades.',
      hi: 'बाहरी ऊँचाई, बाउंड्री वॉल, स्तंभ, रिसॉर्ट व हेरिटेज फ़साड हेतु धौलपुर, जोधपुर पिंक, टीकवुड, रेनबो सैंडस्टोन व रॉक-फ़ेस स्ट्रिप्स।',
    },
    categories: ['sandstone-cladding'],
    image: '/images/applications/elevation.svg',
  },
  {
    id: 'app-staircase',
    label: { en: 'Stairs & Counters', hi: 'सीढ़ियाँ व काउंटर' },
    title: { en: 'Edges profiled to the millimetre', hi: 'मिलीमीटर तक प्रोफ़ाइल किए किनारे' },
    body: {
      en: 'Granite and marble treads, risers, countertops and sills — precision cut, chamfered and bull-nosed in our own lines so they arrive ready to lay.',
      hi: 'ग्रेनाइट व मार्बल स्टेप, राइज़र, काउंटरटॉप व सिल — हमारी ही लाइनों में सटीक कट, चैम्फर व बुल-नोज़, लेने योग्य अवस्था में डिलीवर।',
    },
    categories: ['granite', 'indian-marble'],
    image: '/images/applications/staircase.svg',
  },
]

/* --------------------------------------------------------------------------
   Banners (managed from Admin → Website Banners)
   -------------------------------------------------------------------------- */

export const defaultBanners: Banner[] = [
  {
    id: 'ban-01',
    title: { en: 'Complete Natural Stone Solutions', hi: 'संपूर्ण प्राकृतिक पत्थर समाधान' },
    subtitle: {
      en: 'Manufacturers, processors & wholesale suppliers — direct from Rajasthan quarries to sites across India.',
      hi: 'निर्माता, प्रोसेसर व होलसेल आपूर्तिकर्ता — राजस्थान के खदानों से भारत भर के साइटों तक।',
    },
    image: '/images/hero/hero-main.svg',
    ctaLabel: { en: 'Explore Collections', hi: 'संग्रह देखें' },
    ctaHref: '/products',
    active: true,
    sortOrder: 1,
  },
]

/* --------------------------------------------------------------------------
   Recent inquiries (mock — Admin dashboard)
   -------------------------------------------------------------------------- */

export const mockInquiries: Inquiry[] = [
  {
    id: 'inq-001',
    name: 'Rakesh Sharma',
    company: 'Sharma Constructions',
    email: 'rakesh@sharmaconstructions.in',
    phone: '+91 98XXX XXXXX',
    subject: 'Bulk Kota Blue calibrated tiles requirement',
    message:
      'We need 8,000 sq.ft of Kota Blue 2x2 calibrated tiles for a school project in Jaipur. Please share quotation and sample availability.',
    productSlug: 'kota-blue',
    status: 'new',
    createdAt: '2026-11-22T09:15:00',
  },
  {
    id: 'inq-002',
    name: 'Architect Meera Nair',
    company: 'Studio Nair Architects',
    email: 'meera@studionair.com',
    phone: '+91 97XXX XXXXX',
    subject: 'Makrana White slabs for residence',
    message:
      'Looking for Morwad White and Makrana White slabs for a 4BHK residence. Kindly arrange sample dispatch and video inspection.',
    productSlug: 'makrana-white',
    status: 'contacted',
    createdAt: '2026-11-21T14:40:00',
  },
  {
    id: 'inq-003',
    name: 'Imran Qureshi',
    company: 'Qureshi Builders & Developers',
    email: 'imran@qureshibuilders.com',
    phone: '+91 99XXX XXXXX',
    subject: 'Parking tiles for township podium',
    message:
      'Requirement for approx. 15,000 sq.ft parking tiles and cobbles for a township podium. Need rate quotation with thickness details.',
    productSlug: 'kota-parking-tiles',
    status: 'quoted',
    createdAt: '2026-11-20T11:05:00',
  },
  {
    id: 'inq-004',
    name: 'Sanjay Verma',
    email: 'sanjay.verma@gmail.com',
    phone: '+91 96XXX XXXXX',
    subject: 'Granite countertop query',
    message:
      'Interested in Rajasthan Black granite for kitchen countertops. Please share available slab sizes and finishing options.',
    productSlug: 'rajasthan-black',
    status: 'new',
    createdAt: '2026-11-19T16:20:00',
  },
  {
    id: 'inq-005',
    name: 'Priya Menon',
    company: 'Holiday Resorts Pvt Ltd',
    email: 'priya@holidayresorts.co.in',
    phone: '+91 95XXX XXXXX',
    subject: 'Sandstone cladding for resort facade',
    message:
      'We are building a resort in Udaipur and need Teakwood and Rainbow sandstone cladding. Please share catalogue and rates.',
    productSlug: 'teakwood-sandstone',
    status: 'closed',
    createdAt: '2026-11-17T10:30:00',
  },
]
