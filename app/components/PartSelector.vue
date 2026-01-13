<script setup lang="ts">
const props = defineProps<{
  options: string[]
  value: string
  label: string
  isColor?: boolean
}>()

const emit = defineEmits<{
  update: [value: string]
}>()

const currentIndex = computed(() => {
  const index = props.options.indexOf(props.value)
  return index >= 0 ? index : 0
})

function previous() {
  const newIndex = currentIndex.value === 0 ? props.options.length - 1 : currentIndex.value - 1
  const newValue = props.options[newIndex]
  if (newValue !== undefined) {
    emit('update', newValue)
  }
}

function next() {
  const newIndex = currentIndex.value === props.options.length - 1 ? 0 : currentIndex.value + 1
  const newValue = props.options[newIndex]
  if (newValue !== undefined) {
    emit('update', newValue)
  }
}

const displayLabel = computed(() => {
  if (props.isColor) {
    return props.value || props.options[0] || ''
  }
  const current = props.value || props.options[0] || ''
  // Make label more readable
  return current
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim() || 'None'
})
</script>

<template>
  <div class="part-selector">
    <div class="part-nav">
      <button
        class="nav-arrow"
        type="button"
        aria-label="Previous option"
        @click="previous"
      >
        ◀
      </button>
      <span
        v-if="isColor"
        class="color-swatch"
        :style="{ backgroundColor: displayLabel }"
      />
      <span
        v-else
        class="part-label"
      >{{ displayLabel }}</span>
      <button
        class="nav-arrow"
        type="button"
        aria-label="Next option"
        @click="next"
      >
        ▶
      </button>
    </div>
    <div class="part-counter">
      {{ currentIndex + 1 }} / {{ options.length }}
    </div>
  </div>
</template>

<style scoped>
.part-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.part-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.part-label {
  min-width: 160px;
  text-align: center;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.color-swatch {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  border: 3px solid var(--bg-secondary);
  box-shadow: 0 2px 8px var(--shadow);
}

.part-counter {
  font-size: 0.875rem;
  color: var(--text-secondary);
}
</style>
