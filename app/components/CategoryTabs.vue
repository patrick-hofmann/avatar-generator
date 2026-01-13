<script setup lang="ts">
import type { AvatarCategory } from '../composables/useAvatarOptions'

defineProps<{
  categories: AvatarCategory[]
  activeIndex: number
}>()

const emit = defineEmits<{
  select: [index: number]
}>()
</script>

<template>
  <nav class="categories">
    <div class="category-tabs">
      <button
        v-for="(category, index) in categories"
        :key="category.key"
        type="button"
        class="category-tab"
        :class="{ active: index === activeIndex }"
        :aria-label="category.label"
        :title="category.label"
        @click="emit('select', index)"
      >
        {{ category.icon }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.categories {
  padding-bottom: env(safe-area-inset-bottom, var(--space-sm));
}

.category-tabs {
  display: flex;
  justify-content: space-around;
  gap: var(--space-xs);
  padding: var(--space-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: 0 -2px 10px var(--shadow);
}

.category-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target-lg);
  height: var(--touch-target-lg);
  font-size: 1.5rem;
  background: transparent;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  color: var(--text-primary);
  padding: 0;
  min-width: auto;
  min-height: auto;
}

.category-tab:hover {
  background: var(--bg-primary);
}

.category-tab.active {
  background: var(--accent);
  border-color: var(--accent);
}
</style>
