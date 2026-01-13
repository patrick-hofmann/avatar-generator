import { test, expect } from '@playwright/test'

test.describe('Avatar Generator', () => {
  test.describe('Landing Page', () => {
    test('should display the landing page', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('h1')).toContainText('Avatar Generator')
      await expect(page.locator('input[type="text"]')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Avatar erstellen' })).toBeVisible()
    })

    test('should have disabled button when name is empty', async ({ page }) => {
      await page.goto('/')
      const button = page.getByRole('button', { name: 'Avatar erstellen' })
      await expect(button).toBeDisabled()
    })

    test('should enable button when name is entered', async ({ page }) => {
      await page.goto('/')
      await page.locator('input[type="text"]').fill('testuser')
      const button = page.getByRole('button', { name: 'Avatar erstellen' })
      await expect(button).toBeEnabled()
    })

    test('should navigate to editor when creating avatar', async ({ page }) => {
      await page.goto('/')
      await page.locator('input[type="text"]').fill('testuser')
      await page.getByRole('button', { name: 'Avatar erstellen' }).click()
      await expect(page).toHaveURL('/testuser')
    })

    test('should navigate on Enter key', async ({ page }) => {
      await page.goto('/')
      await page.locator('input[type="text"]').fill('entertest')
      await page.locator('input[type="text"]').press('Enter')
      await expect(page).toHaveURL('/entertest')
    })
  })

  test.describe('Editor Page', () => {
    test('should display the editor with avatar preview', async ({ page }) => {
      await page.goto('/testuser2')
      await expect(page.locator('.avatar-name')).toContainText('testuser2')
      await expect(page.locator('.avatar-preview')).toBeVisible()
    })

    test('should display category tabs', async ({ page }) => {
      await page.goto('/testuser3')
      await expect(page.locator('.category-tabs')).toBeVisible()
      const tabs = page.locator('.category-tab')
      await expect(tabs).toHaveCount(8)
    })

    test('should switch categories when clicking tabs', async ({ page }) => {
      await page.goto('/testuser4')
      // Click on eyes category (second tab)
      await page.locator('.category-tab').nth(1).click()
      // Part selector should be visible
      await expect(page.locator('.part-nav')).toBeVisible()
    })

    test('should cycle through options with arrows', async ({ page }) => {
      await page.goto('/testuser5')
      // Click on eyes category
      await page.locator('.category-tab').nth(1).click()

      const partLabel = page.locator('.part-label')
      const initialText = await partLabel.textContent()

      // Click next arrow
      await page.locator('.nav-arrow').last().click()
      const newText = await partLabel.textContent()

      expect(newText).not.toBe(initialText)
    })

    test('should display color picker for skin color category', async ({ page }) => {
      await page.goto('/testuser6')
      // First category is skin color
      await expect(page.locator('.color-picker')).toBeVisible()
      await expect(page.locator('.color-circle')).toHaveCount(8)
    })

    test('should change color when clicking color circle', async ({ page }) => {
      await page.goto('/testuser7')
      // Click second color circle
      const colorCircles = page.locator('.color-circle')
      await colorCircles.nth(1).click()
      // Second circle should be selected
      await expect(colorCircles.nth(1)).toHaveClass(/selected/)
    })
  })

  test.describe('Avatar Persistence', () => {
    test('should save and reload avatar', async ({ page }) => {
      // Create avatar and make changes
      await page.goto('/persisttest')

      // Wait for avatar to load
      await expect(page.locator('.avatar-preview')).toBeVisible()

      // Click on clothing category (6th tab)
      await page.locator('.category-tab').nth(5).click()

      // Click next to change clothing
      await page.locator('.nav-arrow').last().click()

      // Wait for debounced save
      await page.waitForTimeout(600)

      // Reload page
      await page.reload()

      // Avatar should still be visible
      await expect(page.locator('.avatar-preview')).toBeVisible()
      await expect(page.locator('.avatar-name')).toContainText('persisttest')
    })
  })
})
