import type { Service } from '@/types'

/** Value-added supply services — PDF §6, verbatim scope. */
export const services: Service[] = [
  {
    id: 'srv-01',
    slug: 'custom-size-cutting',
    title: { en: 'Custom Size Cutting & Edge Profiling', hi: 'कस्टम साइज़ कटिंग व एज प्रोफ़ाइलिंग' },
    summary: {
      en: 'Precision cutting, chamfering, bull-nosing and groove-making for treads, risers, sills and skirting.',
      hi: 'स्टेप, राइज़र, सिल व स्कर्टिंग हेतु सटीक कटिंग, चैम्फ़रिंग, बुल-नोज़िंग व ग्रूव।',
    },
    description: {
      en: 'Every order can be cut to your drawing. We run precision cutting, chamfering, bull-nosing and groove-making so stair treads, risers, window sills and skirting arrive ready to lay — reducing on-site work and material waste.',
      hi: 'हर ऑर्डर आपके ड्रॉइंग अनुसार काटा जा सकता है। सटीक कटिंग, चैम्फ़रिंग, बुल-नोज़िंग व ग्रूव बनाकर स्टेप, राइज़र, खिड़की सिल व स्कर्टिंग लेने योग्य पहुँचते हैं।',
    },
    points: [
      { en: 'Precision cutting to project drawings', hi: 'प्रोजेक्ट ड्रॉइंग अनुसार सटीक कटिंग' },
      { en: 'Chamfering, bull-nosing & groove-making', hi: 'चैम्फ़रिंग, बुल-नोज़िंग व ग्रूव निर्माण' },
      { en: 'Stair treads, risers, sills & skirting', hi: 'स्टेप, राइज़र, सिल व स्कर्टिंग' },
      { en: 'Less on-site grinding, cleaner finish', hi: 'कम ऑन-साइट ग्राइंडिंग, बेहतर फ़िनिश' },
    ],
    icon: 'ruler',
    image: '/images/processing/cutting.svg',
  },
  {
    id: 'srv-02',
    slug: 'grade-shade-sorting',
    title: { en: 'Grade & Shade Sorting', hi: 'ग्रेड व शेड सॉर्टिंग' },
    summary: {
      en: 'Strict lot-wise sorting so an entire floor or facade holds one uniform, cohesive shade.',
      hi: 'कड़ी लॉट-दर-लॉट छँटाई ताकि पूरा फ़र्श या फ़साड एकसमान रंगत का रहे।',
    },
    description: {
      en: 'Natural stone moves in tone from block to block. We sort strictly lot-wise by grade and shade so your entire floor or facade maintains a uniform, cohesive natural shade — no surprise panels on site.',
      hi: 'प्राकृतिक पत्थर का रंग ब्लॉक-दर-ब्लॉक बदलता है। हम कड़ाई से ग्रेड व शेड अनुसार लॉट-दर-लॉट छाँटते हैं ताकि पूरा फ़र्श या फ़साड एकसमान रंगत का रहे।',
    },
    points: [
      { en: 'Lot-wise grading before dispatch', hi: 'डिस्पैच से पूर्व लॉट-दर-लॉट ग्रेडिंग' },
      { en: 'Uniform shade across full quantities', hi: 'पूरी मात्रा में एकसमान शेड' },
      { en: 'Colour consistency inspection', hi: 'रंग-समानता निरीक्षण' },
      { en: 'Cohesive result on floor & facade', hi: 'फ़र्श व फ़साड पर एकीकृत परिणाम' },
    ],
    icon: 'layers',
    image: '/images/processing/sorting.svg',
  },
  {
    id: 'srv-03',
    slug: 'sample-dispatch-inspection',
    title: { en: 'Sample Dispatch & Video Inspection', hi: 'नमूना भेजना व वीडियो निरीक्षण' },
    summary: {
      en: 'Physical samples and live stockyard video verification before dispatch, for complete buyer confidence.',
      hi: 'डिस्पैच से पूर्व भौतिक नमूने व लाइव स्टॉकयार्ड वीडियो सत्यापन — पूर्ण खरीदार विश्वास।',
    },
    description: {
      en: 'Before you commit to a full truckload, we dispatch physical stone samples and share live video verification of the actual stock. What you approve is what gets loaded.',
      hi: 'पूरा ट्रकलोड तय करने से पहले हम भौतिक नमूने भेजते हैं और वास्तविक स्टॉक का लाइव वीडियो सत्यापन साझा करते हैं। जो आप स्वीकृत करते हैं, वही लोड होता है।',
    },
    points: [
      { en: 'Physical stone samples dispatched', hi: 'भौतिक स्टोन नमूने भेजे जाते हैं' },
      { en: 'Live stockyard video verification', hi: 'लाइव स्टॉकयार्ड वीडियो सत्यापन' },
      { en: 'Approve before loading', hi: 'लोडिंग से पहले स्वीकृति' },
      { en: 'Complete buyer confidence', hi: 'पूर्ण खरीदार विश्वास' },
    ],
    icon: 'video',
    image: '/images/processing/inspection.svg',
  },
  {
    id: 'srv-04',
    slug: 'end-to-end-logistics',
    title: { en: 'End-to-End Logistics & Safe Loading', hi: 'एंड-टू-एंड लॉजिस्टिक्स व सुरक्षित लोडिंग' },
    summary: {
      en: 'Protective separators, wooden crates and reliable transport for full-truckload and part-load deliveries across India.',
      hi: 'सुरक्षात्मक सेपरेटर, लकड़ी के क्रेट व भरोसेमंद ट्रांसपोर्ट — भारत भर में फ़ुल व पार्ट ट्रकलोड।',
    },
    description: {
      en: 'Experienced loading teams pack with protective separators, wooden crates and strapped pallets, then move your material with reliable transport partners — for full truckload (10-tyre / 12-tyre) and part-load deliveries across India.',
      hi: 'अनुभवी लोडिंग टीम सुरक्षात्मक सेपरेटर, लकड़ी के क्रेट व स्ट्रैप्ड पैलेट में पैक कर भरोसेमंद ट्रांसपोर्ट साथी से भेजती है — फ़ुल ट्रकलोड (10/12 टायर) व पार्ट लोड, भारत भर में।',
    },
    points: [
      { en: 'Protective separators & wooden crates', hi: 'सुरक्षात्मक सेपरेटर व लकड़ी के क्रेट' },
      { en: 'Experienced loading teams', hi: 'अनुभवी लोडिंग टीमें' },
      { en: 'Full truckload & part-load', hi: 'फ़ुल ट्रकलोड व पार्ट लोड' },
      { en: 'Pan-India doorstep delivery', hi: 'पैन-इंडिया डोरस्टेप डिलीवरी' },
    ],
    icon: 'truck',
    image: '/images/processing/loading.svg',
  },
  {
    id: 'srv-05',
    slug: 'b2b-project-consultation',
    title: { en: 'B2B & Project Consultation', hi: 'बी2बी व प्रोजेक्ट परामर्श' },
    summary: {
      en: 'Dedicated rate quotations, quantity estimation and laying guidance for architects, contractors and homeowners.',
      hi: 'आर्किटेक्ट, ठेकेदार व गृहस्वामियों हेतु विशेष रेट कोटेशन, मात्रा अनुमान व लेइंग मार्गदर्शन।',
    },
    description: {
      en: 'We prepare dedicated rate quotations, quantity estimation and laying/maintenance guidance so architects, contractors and homeowners can specify with confidence — from single homes to townships and warehouses.',
      hi: 'हम विशेष रेट कोटेशन, मात्रा अनुमान व लेइंग/रखरखाव मार्गदर्शन तैयार करते हैं ताकि आर्किटेक्ठ, ठेकेदार व गृहस्वामी निश्चिंत होकर निर्णय लें — एक घर से टाउनशिप व गोदाम तक।',
    },
    points: [
      { en: 'Dedicated rate quotations', hi: 'विशेष रेट कोटेशन' },
      { en: 'Quantity estimation', hi: 'मात्रा अनुमान' },
      { en: 'Laying & maintenance guidance', hi: 'लेइंग व रखरखाव मार्गदर्शन' },
      { en: 'Support for architects & contractors', hi: 'आर्किटेक्ट व ठेकेदारों को सहयोग' },
    ],
    icon: 'briefcase',
    image: '/images/processing/consultation.svg',
  },
]

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)
