<script setup lang="ts">
defineProps<{
  colors: string[]
  value: string
}>()

const emit = defineEmits<{
  update: [color: string]
}>()
</script>

<template>
  <div class="color-picker">
    <div class="color-options">
      <button
        v-for="color in colors"
        :key="color"
        type="button"
        class="color-circle"
        :class="{ selected: color === value }"
        :style="{ backgroundColor: color }"
        :aria-label="`Select color ${color}`"
        @click="emit('update', color)"
      />
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  padding: var(--space-xs) 0;
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
}

.color-circle {
  width: var(--touch-target);
  height: var(--touch-target);
  border-radius: var(--radius-full);
  border: 3px solid transparent;
  cursor: pointer;
  transition:
    transform 0.1s,
    border-color 0.2s;
  padding: 0;
  min-width: auto;
  min-height: auto;
}

.color-circle:hover {
  transform: scale(1.1);
  background: inherit;
}

.color-circle.selected {
  border-color: var(--text-primary);
  transform: scale(1.15);
}
</style>
