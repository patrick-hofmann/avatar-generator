<script setup lang="ts">
import type { AvatarUpdate } from '../../shared/types/avatar'
import { categories } from '../composables/useAvatarOptions'

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

// Check if current category is a color category
const isColorCategory = computed(() => {
  if (!currentCategory.value) return false
  const key = currentCategory.value.key
  return key === 'skinColor' || key === 'topColor' || key === 'pantsColor' || key === 'shoesColor'
})

function selectCategory(index: number) {
  currentCategoryIndex.value = index
}

function handlePartUpdate(value: string) {
  if (!currentCategory.value) return
  updateAvatar(currentCategory.value.key as keyof AvatarUpdate, value)
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

      <!-- Selectors Container -->
      <section class="selectors">
        <div class="selector">
          <PartSelector
            :options="currentCategory.options"
            :value="currentValue"
            :label="currentCategory.label"
            :is-color="isColorCategory"
            @update="handlePartUpdate"
          />
        </div>
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

.selectors {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-lg);
}

.selector {
  flex: 0 0 auto;
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
