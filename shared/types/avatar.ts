export interface Avatar {
  name: string
  createdAt: string
  updatedAt: string

  // Body pose (standing)
  body: string

  // Head/Hair style
  head: string

  // Face expression
  face: string

  // Optional beard
  beard: string

  // Optional accessory (glasses)
  accessory: string

  // Colors
  skinColor: string
  topColor: string
  pantsColor: string
  shoesColor: string
}

export type AvatarUpdate = Partial<Omit<Avatar, 'name' | 'createdAt' | 'updatedAt'>>
