<script setup lang="ts">
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import type { Avatar } from '../../shared/types/avatar'

const props = defineProps<{
  avatar: Avatar | null
}>()

const svgHtml = computed(() => {
  if (!props.avatar) return ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: Record<string, any> = {
    seed: props.avatar.name,
    backgroundColor: ['transparent'],
    skinColor: [props.avatar.skinColor.replace('#', '')],
    eyes: [props.avatar.eyes],
    eyebrows: [props.avatar.eyebrows],
    mouth: [props.avatar.mouth],
    top: [props.avatar.top],
    hairColor: [props.avatar.hairColor.replace('#', '')],
    clothing: [props.avatar.clothing],
    clothesColor: [props.avatar.clothingColor.replace('#', '')],
    accessoriesColor: [props.avatar.accessoriesColor.replace('#', '')],
    facialHairColor: [props.avatar.facialHairColor.replace('#', '')],
  }

  if (props.avatar.accessories) {
    options.accessories = [props.avatar.accessories]
    options.accessoriesProbability = 100
  }
  if (props.avatar.facialHair) {
    options.facialHair = [props.avatar.facialHair]
    options.facialHairProbability = 100
  }

  const avatar = createAvatar(avataaars, options)
  return avatar.toString()
})
</script>

<template>
  <div class="avatar-preview">
    <div
      v-if="avatar"
      class="avatar-svg"
      v-html="svgHtml"
    />
    <div
      v-else
      class="avatar-placeholder"
    >
      Loading...
    </div>
  </div>
</template>

<style scoped>
.avatar-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-svg {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  box-shadow: 0 4px 12px var(--shadow);
  overflow: hidden;
}

.avatar-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
