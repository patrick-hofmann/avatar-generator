import type { AvatarUpdate } from '../../shared/types/avatar'
import indexData from '../assets/open-peeps/index.json'

export interface AvatarCategory {
  key: keyof AvatarUpdate
  label: string
  icon: string
  options: string[]
  colorKey?: keyof AvatarUpdate
}

// Body options (standing poses) - filter for ColorPants versions (shirt is colorable)
const bodyOptions = indexData.bodyStanding.filter(b => b.includes('ColorPants'))

// Head/Hair options
const headOptions = indexData.head

// Face options
const faceOptions = indexData.face

// Beard options (with empty for none)
const beardOptions = ['', ...indexData.beard]

// Accessory options (with empty for none)
const accessoryOptions = ['', ...indexData.accessory]

// Color presets
const skinColors = [
  '#FFDFC4',
  '#F0D5BE',
  '#D08B5B',
  '#C68642',
  '#8D5524',
  '#5C3317',
  '#3B2314',
  '#2D1810',
]

const clothingColors = [
  '#E74C3C',
  '#E67E22',
  '#F1C40F',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#6B9080',
  '#34495E',
  '#1ABC9C',
  '#FF69B4',
  '#000000',
  '#FFFFFF',
]

const pantsColors = [
  '#2C3E50',
  '#3D5A80',
  '#1A1A2E',
  '#4A4A4A',
  '#8B4513',
  '#2F4F4F',
  '#191970',
  '#000000',
]

const shoesColors = [
  '#FFFFFF',
  '#000000',
  '#8B4513',
  '#2F4F4F',
  '#DC143C',
  '#4169E1',
  '#FFD700',
  '#2ECC71',
]

export const categories: AvatarCategory[] = [
  {
    key: 'body',
    label: 'Pose',
    icon: '🧍',
    options: bodyOptions,
  },
  {
    key: 'head',
    label: 'Haare',
    icon: '💇',
    options: headOptions,
  },
  {
    key: 'face',
    label: 'Gesicht',
    icon: '😊',
    options: faceOptions,
  },
  {
    key: 'skinColor',
    label: 'Haut',
    icon: '🎨',
    options: skinColors,
  },
  {
    key: 'topColor',
    label: 'Shirt',
    icon: '👕',
    options: clothingColors,
  },
  {
    key: 'shoesColor',
    label: 'Schuhe',
    icon: '👟',
    options: shoesColors,
  },
  {
    key: 'accessory',
    label: 'Brille',
    icon: '👓',
    options: accessoryOptions,
  },
  {
    key: 'beard',
    label: 'Bart',
    icon: '🧔',
    options: beardOptions,
  },
]

export const colorPresets = {
  skin: skinColors,
  clothing: clothingColors,
  pants: pantsColors,
  shoes: shoesColors,
}

export function useAvatarOptions() {
  return {
    categories,
    colorPresets,
    bodyOptions,
    headOptions,
    faceOptions,
    beardOptions,
    accessoryOptions,
  }
}
