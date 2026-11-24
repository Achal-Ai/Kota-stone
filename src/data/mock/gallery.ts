import type { GalleryCollectionId, GalleryItem } from '@/types'

export interface GalleryCollection {
  id: GalleryCollectionId
  name: { en: string; hi: string }
  description: { en: string; hi: string }
}

export const galleryCollections: GalleryCollection[] = [
  {
    id: 'stone-collection',
    name: { en: 'Stone Collection', hi: 'स्टोन संग्रह' },
    description: {
      en: 'Kota, marble, granite and sandstone varieties across shades and finishes.',
      hi: 'रंग व फ़िनिश में कोटा, मार्बल, ग्रेनाइट व सैंडस्टोन किस्में।',
    },
  },
  {
    id: 'stockyard',
    name: { en: 'Stockyard', hi: 'स्टॉकयार्ड' },
    description: {
      en: 'Buffer stock of fast-moving sizes and finishes, ready for dispatch.',
      hi: 'तेज़ी से बिकने वाले आकार व फ़िनिश का बफ़र स्टॉक, डिस्पैच हेतु तैयार।',
    },
  },
  {
    id: 'processing',
    name: { en: 'Processing', hi: 'प्रोसेसिंग' },
    description: {
      en: 'Cutting, calibration, polishing and grading lines at work.',
      hi: 'कटिंग, कैलिब्रेशन, पॉलिशिंग व ग्रेडिंग लाइनें कार्यरत।',
    },
  },
  {
    id: 'applications',
    name: { en: 'Applications', hi: 'अनुप्रयोग' },
    description: {
      en: 'Flooring, parking, elevations, staircases and cladding in place.',
      hi: 'फ़र्श, पार्किंग, ऊँचाई, सीढ़ियाँ व क्लैडिंग व्यवस्थित।',
    },
  },
  {
    id: 'completed-projects',
    name: { en: 'Completed Projects', hi: 'पूर्ण परियोजनाएँ' },
    description: {
      en: 'Homes, institutions and commercial floors supplied across India.',
      hi: 'भारत भर में आपूर्तित घर, संस्थाएँ व व्यावसायिक फ़र्श।',
    },
  },
]

/**
 * Gallery entries are illustrative AI-generated architectural imagery until
 * actual business photographs are supplied. Captions describe the *application*
 * shown — never a named client project.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    title: { en: 'Kota Blue laid in a long corridor', hi: 'लंबे गलियारे में बिछा कोटा ब्लू' },
    caption: {
      en: 'Illustrative — calibrated Kota flooring in a institutional corridor.',
      hi: 'दृश्यात्मक — संस्थागत गलियारे में कैलिब्रेटेड कोटा फ़र्श।',
    },
    collection: 'applications',
    image: '/images/applications/flooring.svg',
  },
  {
    id: 'gal-02',
    title: { en: 'Polished marble living room', hi: 'पॉलिश्ड मार्बल लिविंग रूम' },
    caption: {
      en: 'Illustrative — mirror-polish Indian marble flooring.',
      hi: 'दृश्यात्मक — मिरर-पॉलिश भारतीय मार्बल फ़र्श।',
    },
    collection: 'applications',
    image: '/images/applications/marble-interior.svg',
  },
  {
    id: 'gal-03',
    title: { en: 'Stone-clad exterior elevation', hi: 'पत्थर से क्लैड बाहरी ऊँचाई' },
    caption: {
      en: 'Illustrative — sandstone wall cladding on a house elevation.',
      hi: 'दृश्यात्मक — घर की ऊँचाई पर सैंडस्टोन वॉल क्लैडिंग।',
    },
    collection: 'applications',
    image: '/images/applications/elevation.svg',
  },
  {
    id: 'gal-04',
    title: { en: 'Heavy-duty stone parking', hi: 'हैवी-ड्यूटी स्टोन पार्किंग' },
    caption: {
      en: 'Illustrative — thick parking tiles on a driveway.',
      hi: 'दृश्यात्मक — ड्राइववे पर मोटी पार्किंग टाइल्स।',
    },
    collection: 'applications',
    image: '/images/applications/parking.svg',
  },
  {
    id: 'gal-05',
    title: { en: 'Slabs stacked in the stockyard', hi: 'स्टॉकयार्ड में ढेर किए स्लैब' },
    caption: {
      en: 'Illustrative — gangsaw slabs held in buffer stock.',
      hi: 'दृश्यात्मक — बफ़र स्टॉक में रखे गैंगसॉ स्लैब।',
    },
    collection: 'stockyard',
    image: '/images/processing/stockyard.svg',
  },
  {
    id: 'gal-06',
    title: { en: 'Gangsaw cutting line', hi: 'गैंगसॉ कटिंग लाइन' },
    caption: {
      en: 'Illustrative — block cutting on the processing line.',
      hi: 'दृश्यात्मक — प्रोसेसिंग लाइन पर ब्लॉक कटिंग।',
    },
    collection: 'processing',
    image: '/images/processing/cutting.svg',
  },
  {
    id: 'gal-07',
    title: { en: 'Multi-head polishing line', hi: 'मल्टी-हेड पॉलिशिंग लाइन' },
    caption: {
      en: 'Illustrative — diamond polishing for mirror finish.',
      hi: 'दृश्यात्मक — मिरर फ़िनिश हेतु डायमंड पॉलिशिंग।',
    },
    collection: 'processing',
    image: '/images/processing/polishing.svg',
  },
  {
    id: 'gal-08',
    title: { en: 'Granite shades side by side', hi: 'साथ-साथ ग्रेनाइट शेड्स' },
    caption: {
      en: 'Illustrative — granite varieties sorted by shade.',
      hi: 'दृश्यात्मक — शेड अनुसार छँटे ग्रेनाइट वेरायटीज़।',
    },
    collection: 'stone-collection',
    image: '/images/categories/granite.svg',
  },
  {
    id: 'gal-09',
    title: { en: 'Marble slabs in daylight', hi: 'दिन की रोशनी में मार्बल स्लैब' },
    caption: {
      en: 'Illustrative — Indian marble slabs graded for shade.',
      hi: 'दृश्यात्मक — शेड हेतु छँटे भारतीय मार्बल स्लैब।',
    },
    collection: 'stone-collection',
    image: '/images/categories/indian-marble.svg',
  },
  {
    id: 'gal-10',
    title: { en: 'Load-ready pallets', hi: 'लोड-तैयार पैलेट' },
    caption: {
      en: 'Illustrative — strapped pallets prepared for dispatch.',
      hi: 'दृश्यात्मक — डिस्पैच हेतु तैयार स्ट्रैप्ड पैलेट।',
    },
    collection: 'stockyard',
    image: '/images/processing/loading.svg',
  },
  {
    id: 'gal-11',
    title: { en: 'Cobble-paved driveway', hi: 'कॉबल-पेव्ड ड्राइववे' },
    caption: {
      en: 'Illustrative — cobbles laid along a residential drive.',
      hi: 'दृश्यात्मक — आवासीय ड्राइव पर बिछे कॉबल्स।',
    },
    collection: 'applications',
    image: '/images/applications/driveway.svg',
  },
  {
    id: 'gal-12',
    title: { en: 'Textured rock-face cladding', hi: 'बनावट वाली रॉक-फ़ेस क्लैडिंग' },
    caption: {
      en: 'Illustrative — projecting rock-face strips catching light.',
      hi: 'दृश्यात्मक — प्रकाश पकड़ती उभरी रॉक-फ़ेस स्ट्रिप्स।',
    },
    collection: 'completed-projects',
    image: '/images/categories/sandstone-cladding.svg',
  },
]
