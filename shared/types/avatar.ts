export interface Avatar {
  name: string
  createdAt: string
  updatedAt: string

  // Gesicht
  skinColor: string

  // Augen & Augenbrauen
  eyes: string
  eyebrows: string

  // Mund
  mouth: string

  // Haare/Kopfbedeckung
  top: string
  hairColor: string

  // Kleidung
  clothing: string
  clothingColor: string

  // Accessoires (optional)
  accessories: string
  accessoriesColor: string

  // Bart (optional)
  facialHair: string
  facialHairColor: string
}

export type AvatarUpdate = Partial<Omit<Avatar, 'name' | 'createdAt' | 'updatedAt'>>
