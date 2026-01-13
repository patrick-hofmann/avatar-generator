import { describe, it, expect } from 'vitest'
import { categories, colorPresets, useAvatarOptions } from '~/app/composables/useAvatarOptions'

describe('useAvatarOptions', () => {
  describe('categories', () => {
    it('should have all required categories', () => {
      const categoryKeys = categories.map(c => c.key)
      expect(categoryKeys).toContain('skinColor')
      expect(categoryKeys).toContain('eyes')
      expect(categoryKeys).toContain('eyebrows')
      expect(categoryKeys).toContain('mouth')
      expect(categoryKeys).toContain('top')
      expect(categoryKeys).toContain('clothing')
      expect(categoryKeys).toContain('accessories')
      expect(categoryKeys).toContain('facialHair')
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

    it('should have colorKey for categories that support colors', () => {
      const topCategory = categories.find(c => c.key === 'top')
      expect(topCategory?.colorKey).toBe('hairColor')

      const clothingCategory = categories.find(c => c.key === 'clothing')
      expect(clothingCategory?.colorKey).toBe('clothingColor')
    })
  })

  describe('colorPresets', () => {
    it('should have skin color presets', () => {
      expect(colorPresets.skin).toBeDefined()
      expect(colorPresets.skin.length).toBeGreaterThan(0)
    })

    it('should have hair color presets', () => {
      expect(colorPresets.hair).toBeDefined()
      expect(colorPresets.hair.length).toBeGreaterThan(0)
    })

    it('should have clothing color presets', () => {
      expect(colorPresets.clothing).toBeDefined()
      expect(colorPresets.clothing.length).toBeGreaterThan(0)
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
      expect(options.eyeOptions).toBeDefined()
      expect(options.mouthOptions).toBeDefined()
      expect(options.topOptions).toBeDefined()
      expect(options.clothingOptions).toBeDefined()
    })
  })
})
