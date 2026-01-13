import type { Avatar } from '../../shared/types/avatar'

export const defaultAvatarValues: Omit<Avatar, 'name' | 'createdAt' | 'updatedAt'> = {
  skinColor: '#F5D6C6',
  eyes: 'default',
  eyebrows: 'default',
  mouth: 'smile',
  top: 'shortFlat',
  hairColor: '#4A3728',
  clothing: 'hoodie',
  clothingColor: '#3498DB',
  accessories: '',
  accessoriesColor: '#000000',
  facialHair: '',
  facialHairColor: '#4A3728',
}

export function createDefaultAvatar(name: string): Avatar {
  const now = new Date().toISOString()
  return {
    name,
    createdAt: now,
    updatedAt: now,
    ...defaultAvatarValues,
  }
}
