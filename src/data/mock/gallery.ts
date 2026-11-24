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
    name: { en: 'Stockyard & Logistics', hi: 'स्टॉकयार्ड व लॉजिस्टिक्स' },
    description: {
      en: 'Buffer stock of fast-moving sizes, quarry blocks, and export-grade crate packing.',
      hi: 'तेज़ी से बिकने वाले आकार, खदान ब्लॉक व एक्सपोर्ट-ग्रेड क्रेट पैकिंग का बफ़र स्टॉक।',
    },
  },
  {
    id: 'processing',
    name: { en: 'Processing & Cutting', hi: 'प्रोसेसिंग व कटिंग' },
    description: {
      en: 'Gangsaw slicing, multi-head calibration, continuous diamond polishing and grading.',
      hi: 'गैंगसॉ कटिंग, कैलिब्रेशन, कंटीन्यूअस डायमंड पॉलिशिंग व ग्रेडिंग।',
    },
  },
  {
    id: 'applications',
    name: { en: 'Applications & Interior', hi: 'अनुप्रयोग व इंटीरियर' },
    description: {
      en: 'Living floors, staircases, kitchen countertops, driveways, elevations and courtyards.',
      hi: 'लिविंग फ़र्श, सीढ़ियाँ, किचन काउंटरटॉप, ड्राइववे, ऊँचाई व आँगन।',
    },
  },
  {
    id: 'completed-projects',
    name: { en: 'Completed Projects', hi: 'पूर्ण परियोजनाएँ' },
    description: {
      en: 'Luxury residences, institutions, facades and commercial projects supplied across India.',
      hi: 'भारत भर में आपूर्तित लक्ज़री आवास, संस्थाएँ, फ़साड व व्यावसायिक परियोजनाएँ।',
    },
  },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    title: { en: 'Kota Blue laid in a sunlit corridor', hi: 'धूपदार गलियारे में बिछा कोटा ब्लू' },
    caption: {
      en: 'Calibrated Kota stone flooring in a high-traffic institutional corridor with soft natural lighting and tight hairline joints.',
      hi: 'सटीक जोड़ों और प्राकृतिक प्रकाश के साथ संस्थागत गलियारे में कैलिब्रेटेड कोटा स्टोन फ़र्श।',
    },
    collection: 'applications',
    image: '/images/gallery/kota-flooring.jpg',
  },
  {
    id: 'gal-02',
    title: { en: 'Mirror-polished Makrana marble living room', hi: 'मिरर-पॉलिश्ड मकराना मार्बल लिविंग रूम' },
    caption: {
      en: 'Pristine white Indian marble flooring with subtle natural veining and high-gloss reflection in a modern luxury villa.',
      hi: 'आधुनिक लक्ज़री विला में हल्की शिराओं और दर्पण चमक के साथ भारतीय सफेद मार्बल फ़र्श।',
    },
    collection: 'applications',
    image: '/images/gallery/marble-living.jpg',
  },
  {
    id: 'gal-03',
    title: { en: 'Teakwood sandstone exterior elevation', hi: 'टीकवुड सैंडस्टोन बाहरी एलिवेशन' },
    caption: {
      en: 'Warm Rajasthan sandstone wall cladding and rock-face elevation strips catching rich golden hour sunlight.',
      hi: 'सुनहरी धूप में चमकती राजस्थान सैंडस्टोन वॉल क्लैडिंग व रॉक-फ़ेस एलिवेशन स्ट्रिप्स।',
    },
    collection: 'applications',
    image: '/images/gallery/sandstone-facade.jpg',
  },
  {
    id: 'gal-04',
    title: { en: 'Heavy-duty basalt cobble driveway', hi: 'हैवी-ड्यूटी बेसाल्ट कॉबल ड्राइववे' },
    caption: {
      en: 'Dark split-face basalt cobblestones in fan-pattern for private estate entrance, ramp, and heavy vehicle parking.',
      hi: 'प्राइवेट एस्टेट ड्राइववे और रैम्प हेतु फैन-पैटर्न में प्रामाणिक स्प्लिट-फ़ेस बेसाल्ट कॉबल्स।',
    },
    collection: 'applications',
    image: '/images/gallery/cobble-driveway.jpg',
  },
  {
    id: 'gal-05',
    title: { en: 'Polished Rajasthan Black granite kitchen island', hi: 'पॉलिश्ड राजस्थान ब्लैक ग्रेनाइट किचन काउंटर' },
    caption: {
      en: 'Seamless granite waterfall island with precision-eased edge profiling, showing crystalline mineral depth under warm downlights.',
      hi: 'सटीक एज प्रोफ़ाइलिंग और समृद्ध क्रिस्टल चमक के साथ सीमलेस ब्लैक ग्रेनाइट वाटरफ़ॉल आइलैंड।',
    },
    collection: 'applications',
    image: '/images/gallery/black-granite-kitchen.jpg',
  },
  {
    id: 'gal-06',
    title: { en: 'Solid white marble floating staircase', hi: 'सॉलिड व्हाइट मार्बल सीढ़ी' },
    caption: {
      en: 'Calibrated Makrana marble treads with honed non-slip finish and integrated architectural step lighting.',
      hi: 'होन्ड नॉन-स्लिप फ़िनिश और इंटीग्रेटेड स्टेप लाइटिंग के साथ कैलिब्रेटेड मार्बल सीढ़ियाँ।',
    },
    collection: 'applications',
    image: '/images/gallery/marble-staircase.jpg',
  },
  {
    id: 'gal-07',
    title: { en: 'Natural stone heritage courtyard', hi: 'प्राकृतिक पत्थर हेरिटेज आँगन' },
    caption: {
      en: 'Warm natural flagstones laid in traditional courtyard pattern with shaded timber pergola reflections.',
      hi: 'पारंपरिक आँगन पैटर्न में बिछे प्राकृतिक पत्थर के स्लैब और टिम्बर परगोला छांव।',
    },
    collection: 'applications',
    image: '/images/gallery/mandana-courtyard.jpg',
  },
  {
    id: 'gal-08',
    title: { en: 'Vertical gangsaw slabs in Rajasthan yard', hi: 'राजस्थान स्टॉकयार्ड में गैंगसॉ स्लैब' },
    caption: {
      en: 'Massive gangsaw marble, granite, and sandstone slabs organized in heavy steel A-frame racks under the open desert sky.',
      hi: 'खुले आसमान तले हेवी स्टील ए-फ़्रेम रैक में लंबवत व्यवस्थित विशाल गैंगसॉ मार्बल व ग्रेनाइट स्लैब।',
    },
    collection: 'stockyard',
    image: '/images/gallery/quarry-stockyard.jpg',
  },
  {
    id: 'gal-09',
    title: { en: 'Open-pit limestone quarry extraction', hi: 'ओपन-पिट लाइमस्टोन खदान खनन' },
    caption: {
      en: 'Documentary view of an authentic stepped limestone quarry in Rajasthan showing geological stone layers and heavy extraction equipment.',
      hi: 'राजस्थान की सीढ़ीदार लाइमस्टोन खदान का दृश्य — प्राकृतिक भूगर्भीय परतें और भारी खनन मशीनरी।',
    },
    collection: 'stockyard',
    image: '/images/gallery/quarry-extraction.jpg',
  },
  {
    id: 'gal-10',
    title: { en: 'Quarried marble boulders ready for gangsaw', hi: 'गैंगसॉ कटिंग हेतु तैयार विशाल संगमरमर ब्लॉक' },
    caption: {
      en: 'Sound structural quarry boulders numbered and lot-tagged before transport to gangsaw processing lines.',
      hi: 'गैंगसॉ प्रोसेसिंग लाइनों तक परिवहन से पूर्व लॉट-टैग किए गए ठोस प्राकृतिक खदान ब्लॉक।',
    },
    collection: 'stockyard',
    image: '/images/gallery/quarry-blocks.jpg',
  },
  {
    id: 'gal-11',
    title: { en: 'Export-grade wooden crate packaging', hi: 'एक्सपोर्ट-ग्रेड लकड़ी के क्रेट पैकेजिंग' },
    caption: {
      en: 'Calibrated tiles packed with corner protectors, foam sheets, and high-tensile steel straps beside flatbed transport trucks.',
      hi: 'फ़ोम शीट व हाई-टेंसिल स्टील स्ट्रैप से सुरक्षित क्रेट, ट्रांसपोर्ट ट्रक से पैन-इंडिया डिलीवरी हेतु तैयार।',
    },
    collection: 'stockyard',
    image: '/images/gallery/pallets-dispatch.jpg',
  },
  {
    id: 'gal-12',
    title: { en: 'Diamond gangsaw block slicing', hi: 'डायमंड गैंगसॉ ब्लॉक कटिंग' },
    caption: {
      en: 'Multiple high-speed diamond blades slicing through dense stone blocks with precision continuous water mist cooling.',
      hi: 'कंटीन्यूअस वॉटर मिस्ट कूलिंग के साथ ठोस स्टोन ब्लॉकों को सटीक स्लाइस में काटते डायमंड गैंगसॉ ब्लेड।',
    },
    collection: 'processing',
    image: '/images/gallery/stone-processing.jpg',
  },
  {
    id: 'gal-13',
    title: { en: 'Continuous automated slab polishing line', hi: 'कंटीन्यूअस ऑटोमेटेड स्लैब पॉलिशिंग लाइन' },
    caption: {
      en: 'Multi-head bridge polisher using progressive grit abrasives to bring out deep mirror gloss on calibrated slabs.',
      hi: 'कैलिब्रेटेड स्लैब पर एकसमान डीप मिरर-ग्लॉस चमक उभारता मल्टी-हेड ब्रिज पॉलिशर।',
    },
    collection: 'processing',
    image: '/images/gallery/stone-polishing.jpg',
  },
  {
    id: 'gal-14',
    title: { en: 'Bridge saw cut-to-size calibration', hi: 'ब्रिज सॉ कट-टू-साइज कैलिब्रेशन' },
    caption: {
      en: 'Circular diamond bridge saw blade executing precision chamfering, bullnosing, and dimension calibration.',
      hi: 'सटीक चैम्फ़रिंग, बुल-नोज़िंग और डायमेंशन कैलिब्रेशन निष्पादित करती सर्कुलर डायमंड ब्रिज सॉ ब्लेड।',
    },
    collection: 'processing',
    image: '/images/gallery/stone-cutting-craft.jpg',
  },
  {
    id: 'gal-15',
    title: { en: 'Polished Rajasthan Black and Red Granite slabs', hi: 'पॉलिश्ड राजस्थान ब्लैक व रेड ग्रेनाइट स्लैब' },
    caption: {
      en: 'Exhibition display of polished granite varieties showcasing rich feldspar crystal depth and mirror reflection.',
      hi: 'खनिज क्रिस्टल की समृद्ध गहराई और दर्पण जैसी परावर्तन क्षमता प्रदर्शित करते पॉलिश्ड ग्रेनाइट स्लैब।',
    },
    collection: 'stone-collection',
    image: '/images/gallery/granite-slabs.jpg',
  },
  {
    id: 'gal-16',
    title: { en: 'Hand-carved Makrana marble heritage pavilion', hi: 'हस्त-नक्काशीदार मकराना मार्बल हेरिटेज पवेलियन' },
    caption: {
      en: 'Intricately carved white marble pillars, brackets, and arches demonstrating authentic Rajasthan architectural craftsmanship.',
      hi: 'प्रामाणिक राजस्थानी वास्तुकला शिल्प कौशल प्रदर्शित करते नक्काशीदार मकराना मार्बल स्तंभ, ब्रैकेट व मेहराब।',
    },
    collection: 'stone-collection',
    image: '/images/gallery/temple-heritage.jpg',
  },
  {
    id: 'gal-17',
    title: { en: 'Dholpur beige carved sandstone colonnade', hi: 'धौलपुर बेज नक्काशीदार सैंडस्टोन स्तंभमाला' },
    caption: {
      en: 'Turned and hand-fluted sandstone columns supporting an open veranda with natural mineral tone variations.',
      hi: 'प्राकृतिक खनिज रंगों के साथ खुली बरामदे की छत को सहारा देते बारीक नक्काशीदार सैंडस्टोन खंभे।',
    },
    collection: 'stone-collection',
    image: '/images/gallery/sandstone-pillars.jpg',
  },
  {
    id: 'gal-18',
    title: { en: 'Luxury villa infinity pool deck in Kota stone', hi: 'विला इन्फिनिटी पूल डेक कोटा स्टोन में' },
    caption: {
      en: 'Calibrated anti-skid river-finish Kota stone tiles creating a safe, cool, and earthy perimeter around an outdoor swimming pool.',
      hi: 'आउटडोर स्विमिंग पूल के चारों ओर एक सुरक्षित, ठंडा व प्राकृतिक वातावरण तैयार करती एंटी-स्किड कोटा स्टोन टाइल्स।',
    },
    collection: 'completed-projects',
    image: '/images/gallery/villa-patio.jpg',
  },
  {
    id: 'gal-19',
    title: { en: 'Split rock-face wall cladding detail', hi: 'स्प्लिट रॉक-फ़ेस वॉल क्लैडिंग' },
    caption: {
      en: 'Close-up texture of rugged split-face sandstone strips casting natural architectural shadow relief across an exterior facade.',
      hi: 'बाहरी फ़साड पर प्राकृतिक छायादार नक्काशी और बनावट प्रस्तुत करती स्प्लिट-फ़ेस सैंडस्टोन स्ट्रिप्स।',
    },
    collection: 'completed-projects',
    image: '/images/gallery/rockface-cladding.jpg',
  },
  {
    id: 'gal-20',
    title: { en: 'Contemporary natural stone facade architecture', hi: 'समकालीन प्राकृतिक पत्थर फ़साड वास्तुकला' },
    caption: {
      en: 'Modern architectural residence featuring large-format calibrated natural stone panels and seamless vertical reveals.',
      hi: 'बड़े आकार के कैलिब्रेटेड प्राकृतिक पत्थर पैनलों और सीमलेस वर्टिकल रिवील्स वाला आधुनिक आवासीय फ़साड।',
    },
    collection: 'completed-projects',
    image: '/images/gallery/stone-facade-detail.jpg',
  },
]
