import { describe, it, expect } from 'vitest'
import { categories, colorPresets, useAvatarOptions } from '~/app/composables/useAvatarOptions'

describe('useAvatarOptions', () => {
  describe('categories', () => {
    it('should have all required categories', () => {
      const categoryKeys = categories.map(c => c.key)
      expect(categoryKeys).toContain('body')
      expect(categoryKeys).toContain('head')
      expect(categoryKeys).toContain('face')
      expect(categoryKeys).toContain('skinColor')
      expect(categoryKeys).toContain('topColor')
      expect(categoryKeys).toContain('pantsColor')
      expect(categoryKeys).toContain('shoesColor')
      expect(categoryKeys).toContain('accessory')
      expect(categoryKeys).toContain('beard')
    })

    it('should have icons for all categories', () => {
      categories.forEach((category) => {
        expect(category.icon).toBeDefined()
        expect(category.icon.length).toBeGreaterThan(0)
      })
    })

    it('should have options for all categories', () => {
      categories.forEach((category) => {
        expect(category.options).toBeDefined()
        expect(Array.isArray(category.options)).toBe(true)
        expect(category.options.length).toBeGreaterThan(0)
      })
    })

    it('should have correct number of categories', () => {
      expect(categories.length).toBe(9)
    })
  })

  describe('colorPresets', () => {
    it('should have skin color presets', () => {
      expect(colorPresets.skin).toBeDefined()
      expect(colorPresets.skin.length).toBeGreaterThan(0)
    })

    it('should have clothing color presets', () => {
      expect(colorPresets.clothing).toBeDefined()
      expect(colorPresets.clothing.length).toBeGreaterThan(0)
    })

    it('should have pants color presets', () => {
      expect(colorPresets.pants).toBeDefined()
      expect(colorPresets.pants.length).toBeGreaterThan(0)
    })

    it('should have shoes color presets', () => {
      expect(colorPresets.shoes).toBeDefined()
      expect(colorPresets.shoes.length).toBeGreaterThan(0)
    })

    it('should have valid hex color format', () => {
      colorPresets.skin.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      })
    })
  })

  describe('useAvatarOptions composable', () => {
    it('should return categories and colorPresets', () => {
      const options = useAvatarOptions()
      expect(options.categories).toBe(categories)
      expect(options.colorPresets).toBe(colorPresets)
    })

    it('should return individual option arrays', () => {
      const options = useAvatarOptions()
      expect(options.bodyOptions).toBeDefined()
      expect(options.headOptions).toBeDefined()
      expect(options.faceOptions).toBeDefined()
      expect(options.beardOptions).toBeDefined()
      expect(options.accessoryOptions).toBeDefined()
    })
  })
})
