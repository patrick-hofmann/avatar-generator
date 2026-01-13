<script setup lang="ts">
import type { AvatarUpdate } from '../../shared/types/avatar'
import { categories, colorPresets } from '../composables/useAvatarOptions'

const route = useRoute()
const name = computed(() => route.params.name as string)

const { avatar, loading, error, updateAvatar } = useAvatar(name)

const currentCategoryIndex = ref(0)
const currentCategory = computed(() => categories[currentCategoryIndex.value]!)

// Get the current value for the selected category
const currentValue = computed(() => {
  if (!avatar.value || !currentCategory.value) return ''
  return avatar.value[currentCategory.value.key as keyof typeof avatar.value] as string
})

// Get the current color value for categories that have colors
const currentColorValue = computed(() => {
  if (!avatar.value || !currentCategory.value?.colorKey) return ''
  return avatar.value[currentCategory.value.colorKey as keyof typeof avatar.value] as string
})

// Get the color presets for the current category
const currentColorPresets = computed(() => {
  if (!currentCategory.value) return []
  const key = currentCategory.value.key
  if (key === 'skinColor') return colorPresets.skin
  const colorKey = currentCategory.value.colorKey
  if (colorKey === 'hairColor') return colorPresets.hair
  if (colorKey === 'clothingColor') return colorPresets.clothing
  if (colorKey === 'accessoriesColor') return colorPresets.accessories
  if (colorKey === 'facialHairColor') return colorPresets.hair
  return []
})

// Check if current category is a color-only category (skinColor)
const isColorOnlyCategory = computed(() => {
  return currentCategory.value?.key === 'skinColor'
})

// Check if current category has a color picker
const hasColorPicker = computed(() => {
  if (!currentCategory.value) return false
  return currentCategory.value.key === 'skinColor' || !!currentCategory.value.colorKey
})

function selectCategory(index: number) {
  currentCategoryIndex.value = index
}

function handlePartUpdate(value: string) {
  if (!currentCategory.value) return
  updateAvatar(currentCategory.value.key as keyof AvatarUpdate, value)
}

function handleColorUpdate(color: string) {
  if (!currentCategory.value) return
  if (currentCategory.value.key === 'skinColor') {
    updateAvatar('skinColor', color)
  }
  else if (currentCategory.value.colorKey) {
    updateAvatar(currentCategory.value.colorKey as keyof AvatarUpdate, color)
  }
}
</script>

<template>
  <main class="editor">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="loading"
    >
      Laden...
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="error"
    >
      Fehler: {{ error.message }}
    </div>

    <!-- Editor -->
    <template v-else-if="avatar">
      <!-- Avatar Preview -->
      <section class="preview">
        <AvatarPreview :avatar="avatar" />
        <p class="avatar-name">
          {{ avatar.name }}
        </p>
      </section>

      <!-- Part Selector (if not color-only category) -->
      <section
        v-if="!isColorOnlyCategory"
        class="selector"
      >
        <PartSelector
          :options="currentCategory.options"
          :value="currentValue"
          :label="currentCategory.label"
          @update="handlePartUpdate"
        />
      </section>

      <!-- Color Picker -->
      <section
        v-if="hasColorPicker && currentColorPresets.length > 0"
        class="color-section"
      >
        <ColorPicker
          :colors="currentColorPresets"
          :value="isColorOnlyCategory ? currentValue : currentColorValue"
          @update="handleColorUpdate"
        />
      </section>

      <!-- Category Tabs -->
      <CategoryTabs
        :categories="categories"
        :active-index="currentCategoryIndex"
        @select="selectCategory"
      />
    </template>
  </main>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: var(--space-md);
  max-width: 480px;
  margin: 0 auto;
}

.preview {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-sm) 0;
}

.avatar-name {
  margin-top: var(--space-sm);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.selector {
  flex: 0 0 auto;
  padding: var(--space-sm) 0;
}

.color-section {
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.error {
  padding: var(--space-md);
  background: #fee;
  border-radius: var(--radius-md);
  color: #c00;
  text-align: center;
}
</style>
