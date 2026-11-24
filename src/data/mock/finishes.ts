import type { Finish } from '@/types'

/** The five documented Kota Stone finishes from the business profile. */
export const finishes: Finish[] = [
  {
    id: 'mirror-polish',
    name: { en: 'Mirror Polish', hi: 'मिरर पॉलिश' },
    description: {
      en: 'Multi-head diamond polished for a smooth, reflective shine — ideal for homes and showrooms.',
      hi: 'मल्टी-हेड डायमंड पॉलिश, चिकनी दर्पण जैसी चमक — घरों व शोरूम के लिए उपयुक्त।',
    },
  },
  {
    id: 'semi-polish',
    name: { en: 'Fine / Semi-Polish', hi: 'फ़ाइन / सेमी-पॉलिश' },
    description: {
      en: 'Subtle satin finish with low glare, preferred in educational institutions, hospitals and corporate spaces.',
      hi: 'कम चमक वाली सैटिन फ़िनिश — शिक्षण संस्थानों, अस्पतालों और कॉर्पोरेट स्थानों में पसंद की जाती है।',
    },
  },
  {
    id: 'honed',
    name: { en: 'Honed (Matte)', hi: 'होन्ड (मैट)' },
    description: {
      en: 'Flat, velvety non-reflective surface offering modern aesthetics and safe indoor grip.',
      hi: 'समतल, मखमली गैर-चमकदार सतह — आधुनिक रूप और सुरक्षित इनडोर पकड़।',
    },
  },
  {
    id: 'river-finish',
    name: { en: 'River Finish', hi: 'रिवर फ़िनिश' },
    description: {
      en: 'Textured anti-skid surface with an earthy, natural feel for bathrooms, verandahs and sit-outs.',
      hi: 'बनावट वाली एंटी-स्किड सतह, प्राकृतिक अहसास — बाथरूम, वरांडा व सिट-आउट के लिए।',
    },
  },
  {
    id: 'shot-blasted',
    name: { en: 'Shot-Blasted / Natural Split', hi: 'शॉट-ब्लास्टेड / नेचुरल स्प्लिट' },
    description: {
      en: 'High-traction coarse surface engineered for ramps, parking areas, pool decks and industrial sheds.',
      hi: 'उच्च पकड़ वाली मोटी सतह — रैम्प, पार्किंग, पूल डेक और औद्योगिक शेड के लिए।',
    },
  },
]

export const getFinishById = (id: string): Finish | undefined =>
  finishes.find((f) => f.id === id)
