import type { AvatarUpdate } from '../../shared/types/avatar'

export interface AvatarCategory {
  key: keyof AvatarUpdate
  label: string
  icon: string
  options: string[]
  colorKey?: keyof AvatarUpdate
}

// DiceBear Avataaars options
const eyeOptions = [
  'default',
  'closed',
  'cry',
  'eyeRoll',
  'happy',
  'hearts',
  'side',
  'squint',
  'surprised',
  'wink',
  'winkWacky',
  'xDizzy',
]

const eyebrowOptions = [
  'default',
  'defaultNatural',
  'flatNatural',
  'raisedExcited',
  'raisedExcitedNatural',
  'sadConcerned',
  'sadConcernedNatural',
  'unibrowNatural',
  'upDown',
  'upDownNatural',
  'angry',
  'angryNatural',
  'frownNatural',
]

const mouthOptions = [
  'default',
  'concerned',
  'disbelief',
  'eating',
  'grimace',
  'sad',
  'screamOpen',
  'serious',
  'smile',
  'tongue',
  'twinkle',
  'vomit',
]

const topOptions = [
  // Short hair
  'shortFlat',
  'shortRound',
  'shortWaved',
  'shortCurly',
  'dreads01',
  'dreads02',
  'frizzle',
  'shaggyMullet',
  'shaggy',
  'theCaesar',
  'theCaesarAndSidePart',
  'sides',
  // Long hair
  'bob',
  'bun',
  'curly',
  'curvy',
  'dreads',
  'fro',
  'froBand',
  'frida',
  'bigHair',
  'miaWallace',
  'longButNotTooLong',
  'shavedSides',
  'straight01',
  'straight02',
  'straightAndStrand',
  // Hats
  'hat',
  'hijab',
  'turban',
  'winterHat1',
  'winterHat02',
  'winterHat03',
  'winterHat04',
]

const clothingOptions = [
  'blazerShirt',
  'blazerSweater',
  'collarSweater',
  'graphicShirt',
  'hoodie',
  'overall',
  'shirtCrewNeck',
  'shirtScoopNeck',
  'shirtVNeck',
]

const accessoriesOptions = [
  '',
  'eyepatch',
  'kurt',
  'prescription01',
  'prescription02',
  'round',
  'sunglasses',
  'wayfarers',
]

const facialHairOptions = [
  '',
  'beardLight',
  'beardMajestic',
  'beardMedium',
  'moustacheFancy',
  'moustacheMagnum',
]

// Color presets
const skinColors = [
  '#FFDFC4',
  '#F0D5BE',
  '#EECEB3',
  '#E1B899',
  '#D7A884',
  '#C68642',
  '#8D5524',
  '#4A3728',
]

const hairColors = [
  '#090806',
  '#2C222B',
  '#3B3024',
  '#4E433F',
  '#6A4E42',
  '#8D4A43',
  '#B55239',
  '#D6C4C2',
  '#E5C100',
  '#A8D8EA',
  '#FF69B4',
]

const clothingColors = [
  '#E74C3C',
  '#E67E22',
  '#F1C40F',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#1ABC9C',
  '#34495E',
  '#FF69B4',
  '#000000',
  '#FFFFFF',
]

export const categories: AvatarCategory[] = [
  {
    key: 'skinColor',
    label: 'Haut',
    icon: '🎨',
    options: skinColors,
  },
  {
    key: 'eyes',
    label: 'Augen',
    icon: '👁',
    options: eyeOptions,
  },
  {
    key: 'eyebrows',
    label: 'Brauen',
    icon: '🤨',
    options: eyebrowOptions,
  },
  {
    key: 'mouth',
    label: 'Mund',
    icon: '👄',
    options: mouthOptions,
  },
  {
    key: 'top',
    label: 'Haare',
    icon: '💇',
    options: topOptions,
    colorKey: 'hairColor',
  },
  {
    key: 'clothing',
    label: 'Kleidung',
    icon: '👕',
    options: clothingOptions,
    colorKey: 'clothingColor',
  },
  {
    key: 'accessories',
    label: 'Brille',
    icon: '👓',
    options: accessoriesOptions,
    colorKey: 'accessoriesColor',
  },
  {
    key: 'facialHair',
    label: 'Bart',
    icon: '🧔',
    options: facialHairOptions,
    colorKey: 'facialHairColor',
  },
]

export const colorPresets = {
  skin: skinColors,
  hair: hairColors,
  clothing: clothingColors,
  accessories: ['#000000', '#4A3728', '#808080', '#FFD700'],
}

export function useAvatarOptions() {
  return {
    categories,
    colorPresets,
    eyeOptions,
    eyebrowOptions,
    mouthOptions,
    topOptions,
    clothingOptions,
    accessoriesOptions,
    facialHairOptions,
  }
}
