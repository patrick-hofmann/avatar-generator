import { describe, it, expect } from 'vitest'
import { createDefaultAvatar, defaultAvatarValues } from '~/server/utils/avatarDefaults'

describe('avatarDefaults', () => {
  describe('defaultAvatarValues', () => {
    it('should have all required properties', () => {
      expect(defaultAvatarValues).toHaveProperty('body')
      expect(defaultAvatarValues).toHaveProperty('head')
      expect(defaultAvatarValues).toHaveProperty('face')
      expect(defaultAvatarValues).toHaveProperty('beard')
      expect(defaultAvatarValues).toHaveProperty('accessory')
      expect(defaultAvatarValues).toHaveProperty('skinColor')
      expect(defaultAvatarValues).toHaveProperty('topColor')
      expect(defaultAvatarValues).toHaveProperty('pantsColor')
      expect(defaultAvatarValues).toHaveProperty('shoesColor')
    })

    it('should have valid default values', () => {
      expect(defaultAvatarValues.skinColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(defaultAvatarValues.body).toBe('RestingColorTee')
      expect(defaultAvatarValues.head).toBe('ShortOne')
      expect(defaultAvatarValues.face).toBe('Smile')
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
      expect(avatar.body).toBe(defaultAvatarValues.body)
      expect(avatar.face).toBe(defaultAvatarValues.face)
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
