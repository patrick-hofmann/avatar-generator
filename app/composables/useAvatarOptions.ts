import type { AvatarUpdate } from '../../shared/types/avatar'
import indexData from '../assets/open-peeps/index.json'

export interface AvatarCategory {
  key: keyof AvatarUpdate | 'pose' | 'outfitStyle'
  label: string
  icon: string
  options: string[]
  colorKey?: keyof AvatarUpdate
}

// Extract pose names from body options (remove ColorPants/ColorTee suffix)
const poseNames = [...new Set(
  indexData.bodyStanding
    .filter(b => b.includes('ColorPants') || b.includes('ColorTee'))
    .map(b => b.replace(/Color(Pants|Tee)$/, '')),
)]

// Outfit styles
const outfitStyles = ['ColorPants', 'ColorTee']

// Special bodies without color variants
const specialBodies = indexData.bodyStanding.filter(
  b => !b.includes('ColorPants') && !b.includes('ColorTee'),
)

// All body options for validation
const bodyOptions = indexData.bodyStanding

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
    key: 'pose',
    label: 'Pose',
    icon: '🧍',
    options: poseNames,
  },
  {
    key: 'outfitStyle',
    label: 'Outfit',
    icon: '👔',
    options: outfitStyles,
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
    label: 'Farbe',
    icon: '🎨',
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

// Helper to extract pose from body name
export function getPoseFromBody(body: string): string {
  return body.replace(/Color(Pants|Tee)$/, '')
}

// Helper to extract outfit style from body name
export function getOutfitStyleFromBody(body: string): string {
  if (body.endsWith('ColorPants')) return 'ColorPants'
  if (body.endsWith('ColorTee')) return 'ColorTee'
  return 'ColorPants' // default
}

// Helper to combine pose and outfit style
export function combineBodyName(pose: string, outfitStyle: string): string {
  return `${pose}${outfitStyle}`
}

export function useAvatarOptions() {
  return {
    categories,
    colorPresets,
    bodyOptions,
    poseNames,
    outfitStyles,
    specialBodies,
    headOptions,
    faceOptions,
    beardOptions,
    accessoryOptions,
    getPoseFromBody,
    getOutfitStyleFromBody,
    combineBodyName,
  }
}
