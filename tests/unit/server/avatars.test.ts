import { describe, it, expect } from 'vitest'
import { createDefaultAvatar, defaultAvatarValues } from '~/server/utils/avatarDefaults'

describe('avatarDefaults', () => {
  describe('defaultAvatarValues', () => {
    it('should have all required properties', () => {
      expect(defaultAvatarValues).toHaveProperty('skinColor')
      expect(defaultAvatarValues).toHaveProperty('eyes')
      expect(defaultAvatarValues).toHaveProperty('eyebrows')
      expect(defaultAvatarValues).toHaveProperty('mouth')
      expect(defaultAvatarValues).toHaveProperty('top')
      expect(defaultAvatarValues).toHaveProperty('hairColor')
      expect(defaultAvatarValues).toHaveProperty('clothing')
      expect(defaultAvatarValues).toHaveProperty('clothingColor')
      expect(defaultAvatarValues).toHaveProperty('accessories')
      expect(defaultAvatarValues).toHaveProperty('accessoriesColor')
      expect(defaultAvatarValues).toHaveProperty('facialHair')
      expect(defaultAvatarValues).toHaveProperty('facialHairColor')
    })

    it('should have valid default values', () => {
      expect(defaultAvatarValues.skinColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(defaultAvatarValues.eyes).toBe('default')
      expect(defaultAvatarValues.mouth).toBe('smile')
      expect(defaultAvatarValues.clothing).toBe('hoodie')
    })
  })

  describe('createDefaultAvatar', () => {
    it('should create avatar with given name', () => {
      const avatar = createDefaultAvatar('testuser')
      expect(avatar.name).toBe('testuser')
    })

    it('should include all default values', () => {
      const avatar = createDefaultAvatar('testuser')
      expect(avatar.skinColor).toBe(defaultAvatarValues.skinColor)
      expect(avatar.eyes).toBe(defaultAvatarValues.eyes)
      expect(avatar.mouth).toBe(defaultAvatarValues.mouth)
    })

    it('should set createdAt and updatedAt timestamps', () => {
      const before = new Date().toISOString()
      const avatar = createDefaultAvatar('testuser')
      const after = new Date().toISOString()

      expect(avatar.createdAt).toBeDefined()
      expect(avatar.updatedAt).toBeDefined()
      expect(avatar.createdAt >= before).toBe(true)
      expect(avatar.updatedAt <= after).toBe(true)
    })

    it('should set createdAt equal to updatedAt for new avatars', () => {
      const avatar = createDefaultAvatar('testuser')
      expect(avatar.createdAt).toBe(avatar.updatedAt)
    })
  })
})
