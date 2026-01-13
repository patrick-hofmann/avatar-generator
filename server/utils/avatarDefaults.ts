import type { Avatar } from '../../shared/types/avatar'

export const defaultAvatarValues: Omit<Avatar, 'name' | 'createdAt' | 'updatedAt'> = {
  body: 'RestingColorTee',
  head: 'ShortOne',
  face: 'Smile',
  beard: '',
  accessory: '',
  skinColor: '#D08B5B',
  topColor: '#6B9080',
  pantsColor: '#3D5A80',
  shoesColor: '#FFFFFF',
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
