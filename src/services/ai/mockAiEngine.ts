import { KNOWLEDGE_BASE } from './knowledgeBase'
import type { AIServiceResponse, ChatMessage, ProductRecommendation } from './types'

/**
 * Intelligent client-side AI mock engine.
 *
 * Implements:
 * - Natural English & Hindi query detection and responses
 * - Product categorization and recommendation mapping
 * - Sizing, thickness, and finish benchmarks
 * - Lead capture trigger for quotation intent
 * - Truthful boundaries on prices and unverified claims
 */

export function processUserQuery(
  input: string,
  _history: ChatMessage[],
  locale: 'en' | 'hi',
): AIServiceResponse {
  const query = input.trim().toLowerCase()

  // Detect query language (Hindi Unicode range: \u0900-\u097F)
  const isHindiInput = /[\u0900-\u097F]/.test(query)
  const lang: 'en' | 'hi' = isHindiInput ? 'hi' : locale

  // 1. GREETINGS
  if (
    /^(hi|hello|hey|namaste|pranam|good\s*(morning|afternoon|evening)|hola|नमस्ते|नमस्कार|प्रणाम)/i.test(
      query,
    )
  ) {
    if (lang === 'hi') {
      return {
        reply:
          'नमस्ते! मैं पुष्प नारायण स्टोन का AI सेल्स असिस्टेंट हूँ। मैं आपको कोटा स्टोन, भारतीय मार्बल, ग्रेनाइट, पार्किंग टाइल्स और सैंडस्टोन के चुनाव, साइज, और तकनीकी विनिर्देशों में सहायता कर सकता हूँ। आप किस प्रकार के प्रोजेक्ट (घर, मंदिर, पार्किंग या कमर्शियल) के लिए पत्थर ढूंढ रहे हैं?',
        suggestedPrompts: [
          'पूजा कक्ष के लिए मार्बल',
          'घर के लिए कोटा स्टोन',
          'पार्किंग और ड्राइववे के पत्थर',
          'कोटेशन का अनुरोध करें',
        ],
      }
    }
    return {
      reply:
        'Hello! Welcome to Pushp Narayan Stone Supplier. I am your AI Stone Consultant. I can help you select the ideal natural stone for your home, commercial project, temple, or exterior landscaping — including sizes, finishes, and technical specs. What kind of project are you planning?',
      suggestedPrompts: [
        'Marble for Pooja Room / Temple',
        'Kota Stone for home flooring',
        'Driveway & Parking stones',
        'Request a Quotation',
      ],
    }
  }

  // 2. LEAD CAPTURE / QUOTATION REQUEST INTENT
  if (
    query.includes('quote') ||
    query.includes('quotation') ||
    query.includes('order') ||
    query.includes('buy') ||
    query.includes('purchase') ||
    query.includes('sample') ||
    query.includes('estimate') ||
    query.includes('कोटेशन') ||
    query.includes('खरीदना') ||
    query.includes('सैंपल') ||
    query.includes('ऑर्डर')
  ) {
    if (lang === 'hi') {
      return {
        reply:
          'निश्चय ही! डायरेक्ट राजस्थान खदान दर और लॉट उपलब्धता की जांच के लिए आप नीचे दिया गया संक्षिप्त कोटेशन फॉर्म भर सकते हैं। हमारी सेल्स और डिस्पैच टीम आपसे तुरंत संपर्क करेगी:',
        showLeadForm: true,
        showWhatsApp: true,
      }
    }
    return {
      reply:
        'Certainly! To prepare an accurate quarry-direct quotation and verify slab lot availability, please share your project requirements below. Our dispatch desk will get back to you promptly:',
      showLeadForm: true,
      showWhatsApp: true,
    }
  }

  // 3. PRICING INQUIRY (HONEST BOUNDARY)
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('sq ft') ||
    query.includes('sqft') ||
    query.includes('square feet') ||
    query.includes('कीमत') ||
    query.includes('दाम') ||
    query.includes('भाव') ||
    query.includes('रेट')
  ) {
    if (lang === 'hi') {
      return {
        reply:
          'प्राकृतिक पत्थर की वास्तविक कीमतें स्लैब लॉट के रंग, कैलिब्रेटेड मोटाई (16–20mm या 25–40mm), और कुल ऑर्डर मात्रा पर निर्भर करती हैं। हमारी पॉलिसी के तहत हम बिना लॉट इंस्पेक्शन के मनगढ़ंत रेट नहीं देते। आप नीचे दिए फॉर्म से कोटेशन का अनुरोध कर सकते हैं या सीधे हमारे व्हाट्सएप पर जुड़ सकते हैं।',
        showLeadForm: true,
        showWhatsApp: true,
      }
    }
    return {
      reply:
        'Natural stone pricing depends on lot shade consistency, calibrated thickness (e.g. 16–20mm vs 25–40mm), gangsaw sizing, and the total shipment quantity. We never provide unverified estimates. Please share your required square footage below for an exact quarry-direct quote, or connect directly on WhatsApp.',
      showLeadForm: true,
      showWhatsApp: true,
    }
  }

  // 4. WHATSAPP / DIRECT CONTACT
  if (
    query.includes('whatsapp') ||
    query.includes('call') ||
    query.includes('phone') ||
    query.includes('contact') ||
    query.includes('speak') ||
    query.includes('number') ||
    query.includes('व्हाट्सएप') ||
    query.includes('फ़ोन') ||
    query.includes('बात') ||
    query.includes('नंबर')
  ) {
    if (lang === 'hi') {
      return {
        reply:
          'आप हमारी राजस्थान डिस्पैच डेस्क से सीधे व्हाट्सएप पर चैट कर सकते हैं या प्रोजेक्ट कोटेशन का अनुरोध भेज सकते हैं:',
        showWhatsApp: true,
        showLeadForm: true,
      }
    }
    return {
      reply:
        'You can connect directly with our Rajasthan dispatch desk via WhatsApp or submit a formal inquiry form below:',
      showWhatsApp: true,
      showLeadForm: true,
    }
  }

  // 5. TEMPLE / POOJA ROOM / MARBLE INQUIRY
  if (
    query.includes('temple') ||
    query.includes('pooja') ||
    query.includes('mandir') ||
    query.includes('makrana') ||
    query.includes('morwad') ||
    query.includes('marble') ||
    query.includes('white stone') ||
    query.includes('मंदिर') ||
    query.includes('पूजा') ||
    query.includes('मार्बल') ||
    query.includes('मकराना')
  ) {
    const makrana = KNOWLEDGE_BASE.findProductBySlug('makrana-white')
    const morwad = KNOWLEDGE_BASE.findProductBySlug('morwad-white')
    const dungri = KNOWLEDGE_BASE.findProductBySlug('dungri')
    const recs: ProductRecommendation[] = [makrana, morwad, dungri].filter(
      (p): p is ProductRecommendation => Boolean(p),
    )

    if (lang === 'hi') {
      return {
        reply:
          'पूजा कक्ष, मंदिर और लक्ज़री लिविंग एरिया के लिए **मकराना व्हाइट** और **मोरवाड़ व्हाइट** मार्बल सर्वोत्तम माने जाते हैं। यह 15–18 मिमी कटर व गैंगसॉ स्लैब में उपलब्ध हैं और अत्यधिक पॉलिश व शुद्धता प्रदान करते हैं:',
        products: recs,
        suggestedPrompts: [
          'मकराना और मोरवाड़ में क्या अंतर है?',
          'मार्बल स्लैब के क्या साइज उपलब्ध हैं?',
          'मार्बल का कोटेशन चाहिए',
        ],
      }
    }
    return {
      reply:
        'For pooja rooms, temples, and luxury living spaces, **Makrana White** and **Morwad White** are the benchmark Indian marbles. They are supplied in 15–18 mm cutter and gangsaw slabs (from 6×3 ft up to 10×5 ft) and take a mirror polish with low porosity:',
      products: recs,
      suggestedPrompts: [
        'Difference between Makrana and Morwad',
        'Available slab sizes for marble',
        'Request Marble Quotation',
      ],
    }
  }

  // 6. KOTA STONE / INTERIOR FLOORING INQUIRY
  if (
    query.includes('kota') ||
    query.includes('hospital') ||
    query.includes('school') ||
    query.includes('office') ||
    query.includes('corridor') ||
    query.includes('flooring') ||
    query.includes('fars') ||
    query.includes('कोटा') ||
    query.includes('फ़र्श') ||
    query.includes('अस्पताल') ||
    query.includes('स्कूल')
  ) {
    const kotaBlue = KNOWLEDGE_BASE.findProductBySlug('kota-blue')
    const kotaGreen = KNOWLEDGE_BASE.findProductBySlug('kota-green')
    const honeyYellow = KNOWLEDGE_BASE.findProductBySlug('honey-yellow')
    const recs: ProductRecommendation[] = [kotaBlue, kotaGreen, honeyYellow].filter(
      (p): p is ProductRecommendation => Boolean(p),
    )

    if (lang === 'hi') {
      return {
        reply:
          'संस्थागत, कार्यालय और आवासीय फ़र्श के लिए **कोटा स्टोन** सबसे टिकाऊ और किफायती प्राकृतिक पत्थर है। यह 16–20 मिमी की मशीन-कैलिब्रेटेड रेडी-टू-फिट टाइल्स (1×1, 2×1, 2×2 ft) और 18–35 मिमी गैंगसॉ स्लैब में उपलब्ध है। यह स्वाभाविक रूप से ठंडा रहता है और 50+ वर्षों तक चलता है:',
        products: recs,
        suggestedPrompts: [
          'कोटा टाइल्स की मोटाई और साइज क्या है?',
          'रिवर-फिनिश और मिरर-पॉलिश में अंतर',
          'कोटा स्टोन का कोटेशन चाहिए',
        ],
      }
    }
    return {
      reply:
        'For institutional, commercial, and residential flooring, **Kota Stone** is the industry standard. It is supplied both as machine-calibrated 16–20 mm ready-to-fit tiles (1×1 ft, 2×1 ft, 2×2 ft) that install quickly with adhesive, and heavy-duty 18–35 mm gangsaw slabs. It offers high compressive strength (180–210 N/mm²) and keeps interiors naturally cool:',
      products: recs,
      suggestedPrompts: [
        'Kota Stone standard tile sizes',
        'Difference between River finish & Honed',
        'Request Kota Stone Quotation',
      ],
    }
  }

  // 7. PARKING / DRIVEWAY / OUTDOOR INQUIRY
  if (
    query.includes('parking') ||
    query.includes('driveway') ||
    query.includes('cobble') ||
    query.includes('basalt') ||
    query.includes('mandana') ||
    query.includes('outdoor') ||
    query.includes('vehicle') ||
    query.includes('car') ||
    query.includes('पार्किंग') ||
    query.includes('ड्राइववे') ||
    query.includes('गाड़ी') ||
    query.includes('कॉबल') ||
    query.includes('मंदाना')
  ) {
    const parkingTiles = KNOWLEDGE_BASE.findProductBySlug('kota-parking-tiles')
    const basalt = KNOWLEDGE_BASE.findProductBySlug('black-basalt')
    const mandana = KNOWLEDGE_BASE.findProductBySlug('red-mandana')
    const recs: ProductRecommendation[] = [parkingTiles, basalt, mandana].filter(
      (p): p is ProductRecommendation => Boolean(p),
    )

    if (lang === 'hi') {
      return {
        reply:
          'वाहनों के भार और भारी आवागमन वाले ड्राइववे व पार्किंग के लिए हम **25–40 मिमी पार्किंग टाइल्स** और **50–75 मिमी प्राकृतिक कॉबल्स** की सलाह देते हैं। इनमें ब्लैक बेसाल्ट, रेड मंदाना और कोटा पार्किंग टाइल्स एंटी-स्किड ग्रूव्ड व शॉट-ब्लास्टेड फिनिश के साथ आती हैं:',
        products: recs,
        suggestedPrompts: [
          'पार्किंग के लिए कॉबल साइज क्या है?',
          'रेड मंदाना के क्या फायदे हैं?',
          'पार्किंग स्टोन का कोटेशन चाहिए',
        ],
      }
    }
    return {
      reply:
        'For heavy vehicular traffic, ramps, and driveways, we supply heavy-duty **25–40 mm parking tiles** and **50–75 mm natural cobbles**. Varieties include Black Basalt, Red Mandana, and Kota Parking tiles with shot-blasted or grooved anti-skid surfaces engineered for high friction and tire grip:',
      products: recs,
      suggestedPrompts: [
        'Cobble stone standard thicknesses',
        'Anti-skid finishes for wet ramps',
        'Request Parking Stone Quotation',
      ],
    }
  }

  // 8. GRANITE / KITCHEN / COUNTERS / STAIRS
  if (
    query.includes('granite') ||
    query.includes('kitchen') ||
    query.includes('counter') ||
    query.includes('slab') ||
    query.includes('step') ||
    query.includes('stair') ||
    query.includes('tread') ||
    query.includes('ग्रेनाइट') ||
    query.includes('किचन') ||
    query.includes('काउंटर') ||
    query.includes('सीढ़ी')
  ) {
    const rajBlack = KNOWLEDGE_BASE.findProductBySlug('rajasthan-black')
    const southBlack = KNOWLEDGE_BASE.findProductBySlug('south-black')
    const lakhaRed = KNOWLEDGE_BASE.findProductBySlug('lakha-red')
    const recs: ProductRecommendation[] = [rajBlack, southBlack, lakhaRed].filter(
      (p): p is ProductRecommendation => Boolean(p),
    )

    if (lang === 'hi') {
      return {
        reply:
          'किचन प्लेटफॉर्म, खिड़की-दरवाजे की चौखट और सीढ़ियों के लिए **राजस्थान ब्लैक** और **साउथ ब्लैक ग्रेनाइट** सबसे लोकप्रिय विकल्प हैं। यह 15–18 मिमी गैंगसॉ स्लैब में उपलब्ध हैं, अत्यधिक खरोंच-प्रतिरोधी (scratch resistant) हैं और मिरर पॉलिश में आते हैं:',
        products: recs,
        suggestedPrompts: [
          'ग्रेनाइट स्लैब के साइज क्या हैं?',
          'ब्लैक ग्रेनाइट के क्या विकल्प हैं?',
          'ग्रेनाइट का कोटेशन चाहिए',
        ],
      }
    }
    return {
      reply:
        'For kitchen countertops, stair treads, and heavy-traffic thresholds, **Rajasthan Black** and **South Black Granite** offer maximum hardness and scratch resistance. Supplied in 15–18 mm cutter and gangsaw slabs with precision chamfered and bullnosed edging capabilities:',
      products: recs,
      suggestedPrompts: [
        'Granite gangsaw slab dimensions',
        'Edge profiling & bullnosing options',
        'Request Granite Quotation',
      ],
    }
  }

  // 9. SANDSTONE / ELEVATION / WALL CLADDING / RESORT
  if (
    query.includes('sandstone') ||
    query.includes('cladding') ||
    query.includes('elevation') ||
    query.includes('facade') ||
    query.includes('pillar') ||
    query.includes('dholpur') ||
    query.includes('jodhpur') ||
    query.includes('rock face') ||
    query.includes('सैंडस्टोन') ||
    query.includes('क्लैडिंग') ||
    query.includes('दीवार') ||
    query.includes('धौलपुर') ||
    query.includes('जोधपुर')
  ) {
    const dholpur = KNOWLEDGE_BASE.findProductBySlug('dholpur-beige')
    const jodhpur = KNOWLEDGE_BASE.findProductBySlug('jodhpur-pink')
    const rockface = KNOWLEDGE_BASE.findProductBySlug('rock-face-strips')
    const recs: ProductRecommendation[] = [dholpur, jodhpur, rockface].filter(
      (p): p is ProductRecommendation => Boolean(p),
    )

    if (lang === 'hi') {
      return {
        reply:
          'बाहरी घर की ऊंचाई (elevation), चारदीवारी, और रिसॉर्ट फ़साड के लिए **धौलपुर बेज**, **जोधपुर पिंक सैंडस्टोन**, और **रॉक-फेस स्ट्रिप्स** प्राकृतिक गहराई और छाया प्रदान करते हैं। यह 12–18 मिमी मोटाई में 2×12 इंच से 6×24 इंच तक की स्ट्रिप्स में उपलब्ध हैं:',
        products: recs,
        suggestedPrompts: [
          'सैंडस्टोन वॉल क्लैडिंग के साइज',
          'धौलपुर पिंक बनाम धौलपुर बेज',
          'सैंडस्टोन का कोटेशन चाहिए',
        ],
      }
    }
    return {
      reply:
        'For exterior building facades, boundary walls, and heritage resort cladding, **Dholpur Beige**, **Jodhpur Pink Sandstone**, and **Rock-Face Strips** provide rich natural relief and texture. Supplied in 12–18 mm calibrated strips ranging from 2×12 in up to 6×24 in:',
      products: recs,
      suggestedPrompts: [
        'Sandstone strip sizes for elevations',
        'Dholpur Pink vs Dholpur Beige',
        'Request Sandstone Quotation',
      ],
    }
  }

  // 10. SIZES & THICKNESSES
  if (
    query.includes('size') ||
    query.includes('dimension') ||
    query.includes('thickness') ||
    query.includes('gauge') ||
    query.includes('साइज') ||
    query.includes('आकार') ||
    query.includes('मोटाई')
  ) {
    if (lang === 'hi') {
      return {
        reply:
          'हमारे मुख्य स्टैंडर्ड साइज व मोटाई विनिर्देश:\n\n' +
          '• **कोटा कैलिब्रेटेड टाइल्स:** 1×1 ft, 2×1 ft, 2×2 ft (समान मोटाई: 16–20 मिमी)\n' +
          '• **कोटा फ़्लोरिंग स्लैब:** 2×2, 3×2, 4×2, 6×2 ft (मोटाई: 18–35 मिमी)\n' +
          '• **मार्बल व ग्रेनाइट स्लैब:** कटर स्लैब (6×3 ft) व गैंगसॉ स्लैब (8×4 ft से 10×5 ft, मोटाई 15–18 मिमी)\n' +
          '• **पार्किंग टाइल्स व कॉबल्स:** टाइल्स (1×1, 1.5×1.5, 2×2 ft, 25–40 मिमी) व कॉबल्स (4×4, 6×6 in, 50–75 मिमी)\n' +
          '• **वॉल क्लैडिंग स्ट्रिप्स:** 2×12 in, 3×18 in, 4×24 in, 6×24 in (मोटाई 12–18 मिमी)',
        suggestedPrompts: ['कोटा स्टोन देखें', 'मार्बल स्लैब देखें', 'कोटेशन का अनुरोध करें'],
      }
    }
    return {
      reply:
        'Here are our standard sizing and thickness benchmarks:\n\n' +
        '• **Kota Calibrated Tiles:** 1×1 ft, 2×1 ft, 2×2 ft (uniform thickness 16–20 mm for thin-bed adhesive laying)\n' +
        '• **Kota Traditional Slabs:** 2×2, 3×2, 4×2, 6×2 ft (thickness 18–35 mm)\n' +
        '• **Marble & Granite Slabs:** Cutter (6×3 ft) and Gangsaw slabs (8×4 ft up to 10×5 ft, thickness 15–18 mm)\n' +
        '• **Parking & Cobbles:** Tiles 25–40 mm · Cobbles 4×4 & 6×6 in (50–75 mm)\n' +
        '• **Wall Cladding Strips:** 2×12 in up to 6×24 in (thickness 12–18 mm)',
      suggestedPrompts: ['View Kota Stone', 'View Marble Range', 'Request Sizing Quotation'],
    }
  }

  // 11. GENERAL SEARCH FALLBACK
  const searchResults = KNOWLEDGE_BASE.search(query, 3)
  if (searchResults.length > 0) {
    if (lang === 'hi') {
      return {
        reply: `आपकी खोज "${input}" के आधार पर ये उपयुक्त प्राकृतिक पत्थर किस्में उपलब्ध हैं:`,
        products: searchResults,
        suggestedPrompts: ['कोटेशन का अनुरोध करें', 'सीधे व्हाट्सएप पर बात करें'],
      }
    }
    return {
      reply: `Based on your interest in "${input}", here are matching natural stone selections from our Rajasthan quarries:`,
      products: searchResults,
      suggestedPrompts: ['Request Quotation', 'Chat on WhatsApp'],
    }
  }

  // 12. GRACEFUL FALLBACK
  if (lang === 'hi') {
    return {
      reply:
        'मैं आपके प्रश्न के लिए सही जानकारी ढूंढने में मदद करना चाहता हूँ। आप कोटा स्टोन, मकराना मार्बल, ग्रेनाइट, पार्किंग स्टोन, या वॉल क्लैडिंग के बारे में पूछ सकते हैं, या सीधे हमारी सेल्स टीम से कोटेशन मांग सकते हैं।',
      suggestedPrompts: [
        'कोटा स्टोन के प्रकार',
        'मकराना मार्बल की किस्में',
        'पार्किंग और ड्राइववे पत्थर',
        'कोटेशन का अनुरोध करें',
      ],
      showWhatsApp: true,
    }
  }

  return {
    reply:
      'I want to ensure you get the exact stone specification for your project. You can ask about Kota Stone, Makrana & Indian Marble, Granite, Heavy Parking Stones, or Wall Cladding, or connect directly with our dispatch desk.',
    suggestedPrompts: [
      'Kota Stone for flooring',
      'Makrana Marble varieties',
      'Parking & Driveway stone',
      'Request a Quotation',
    ],
    showWhatsApp: true,
  }
}
