<script setup lang="ts">
import type { Avatar } from '../../shared/types/avatar'

// Import SVG data
import bodyStandingData from '../assets/open-peeps/body-standing.json'
import headData from '../assets/open-peeps/head.json'
import faceData from '../assets/open-peeps/face.json'
import beardData from '../assets/open-peeps/beard.json'
import accessoryData from '../assets/open-peeps/accessory.json'

interface SvgPart {
  name: string
  width: number
  height: number
  viewBox: string
  props: string[]
  defaults: Record<string, string>
  paths: Array<{ d: string; fill: string }>
}

const props = defineProps<{
  avatar: Avatar | null
}>()

// Get SVG data for a part
function getBodyData(name: string): SvgPart | null {
  return (bodyStandingData as Record<string, SvgPart>)[name] || null
}

function getHeadData(name: string): SvgPart | null {
  return (headData as Record<string, SvgPart>)[name] || null
}

function getFaceData(name: string): SvgPart | null {
  return (faceData as Record<string, SvgPart>)[name] || null
}

function getBeardData(name: string): SvgPart | null {
  return (beardData as Record<string, SvgPart>)[name] || null
}

function getAccessoryData(name: string): SvgPart | null {
  return (accessoryData as Record<string, SvgPart>)[name] || null
}

// Resolve color variable to actual color
function resolveColor(fill: string, colors: Record<string, string>): string {
  return colors[fill] || fill
}

// Computed SVG parts
const body = computed(() => props.avatar ? getBodyData(props.avatar.body) : null)
const head = computed(() => props.avatar ? getHeadData(props.avatar.head) : null)
const face = computed(() => props.avatar ? getFaceData(props.avatar.face) : null)
const beard = computed(() => props.avatar?.beard ? getBeardData(props.avatar.beard) : null)
const accessory = computed(() => props.avatar?.accessory ? getAccessoryData(props.avatar.accessory) : null)

// Color mappings for each part
const bodyColors = computed(() => {
  if (!props.avatar) return {} as Record<string, string>
  return {
    skinColor: props.avatar.skinColor,
    topColor: props.avatar.topColor,
    pantsColor: props.avatar.pantsColor,
    shoesColor: props.avatar.shoesColor,
    outlineColor: '#000000',
  }
})

const headColors = computed(() => {
  if (!props.avatar) return {} as Record<string, string>
  return {
    skinColor: props.avatar.skinColor,
    outlineColor: '#000000',
  }
})

const faceColors = computed(() => ({
  outlineColor: '#000000',
}))

const beardColors = computed(() => ({
  outlineColor: '#000000',
}))

const accessoryColors = computed(() => ({
  outlineColor: '#000000',
}))

// Head positioning offsets (based on Open Peeps Effigy.js)
const headOffsets: Record<string, { x: number; y: number }> = {
  Bald: { x: 50, y: 20 },
  BangsTwo: { x: 20, y: 0 },
  BantuKnots: { x: 30, y: 0 },
  Bear: { x: 20, y: 0 },
  Bun: { x: -20, y: -30 },
  Beanie: { x: 20, y: 0 },
  BunClip: { x: 20, y: -70 },
  BunKnots: { x: 10, y: -30 },
  BunTwo: { x: -50, y: -90 },
  ColorMedium: { x: 30, y: 0 },
  CornrowsLight: { x: -15, y: 0 },
  DreadsTwo: { x: 0, y: -15 },
  FlatTop: { x: 50, y: 0 },
  FlatTopLong: { x: 50, y: 0 },
  GrayShort: { x: 40, y: 0 },
  HatHip: { x: -30, y: 0 },
  Hijab: { x: 50, y: 20 },
  LongAfro: { x: -100, y: -130 },
  LongBangs: { x: -25, y: 0 },
  LongCurly: { x: -50, y: -40 },
  LongHair: { x: -50, y: 0 },
  MediumBangs: { x: -50, y: 0 },
  MediumBangsColor: { x: -20, y: 0 },
  MediumBangsOne: { x: 40, y: 10 },
  MediumOne: { x: 40, y: 10 },
  MediumStraight: { x: 40, y: 0 },
  MediumTwo: { x: -20, y: 0 },
  Mohawk: { x: 40, y: 0 },
  MohawkKnots: { x: 40, y: 0 },
  NoHairThree: { x: 30, y: 0 },
  NoHairTwo: { x: 30, y: 0 },
  Pomp: { x: 40, y: 0 },
  Shaved: { x: 40, y: 0 },
  ShavedOne: { x: 40, y: 0 },
  ShavedThree: { x: 10, y: -20 },
  ShortFive: { x: 40, y: -10 },
  ShortFour: { x: 40, y: -10 },
  ShortOne: { x: 40, y: -10 },
  ShortThree: { x: 40, y: 0 },
  ShortTwo: { x: 40, y: 0 },
  Turban: { x: 40, y: 0 },
  Twists: { x: 40, y: 0 },
  TwistsTwo: { x: 40, y: 0 },
  Wavy: { x: 40, y: 0 },
}

// Beard positioning offsets
const beardOffsets: Record<string, { x: number; y: number; scale?: string }> = {
  FullColor: { x: 0, y: -20, scale: '0.94 0.97' },
  FullMax: { x: 0, y: -20, scale: '0.98 1' },
  FullMedium: { x: 0, y: -10, scale: '0.98 1' },
  MustacheBull: { x: 0, y: -20 },
  MustacheEight: { x: -240, y: -75 },
}

// Accessory positioning offsets
const accessoryOffsets: Record<string, { x: number; y: number }> = {
  Eyepatch: { x: 0, y: -60 },
  SunglassesTwo: { x: -10, y: 0 },
}

function getHeadOffset(name: string) {
  return headOffsets[name] || { x: 0, y: 0 }
}

function getBeardOffset(name: string) {
  return beardOffsets[name] || { x: 0, y: 0 }
}

function getAccessoryOffset(name: string) {
  return accessoryOffsets[name] || { x: 0, y: 0 }
}
</script>

<template>
  <div class="avatar-preview">
    <svg
      v-if="avatar && body"
      :viewBox="body.viewBox"
      class="avatar-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Body -->
      <g id="Body">
        <path
          v-for="(path, i) in body.paths"
          :key="'body-' + i"
          :d="path.d"
          :fill="resolveColor(path.fill, bodyColors)"
        />
      </g>

      <!-- Head/Hair - positioned relative to body -->
      <g
        v-if="head"
        id="Head"
        :transform="`translate(${570 + getHeadOffset(avatar.head).x}, ${-80 + getHeadOffset(avatar.head).y})`"
      >
        <path
          v-for="(path, i) in head.paths"
          :key="'head-' + i"
          :d="path.d"
          :fill="resolveColor(path.fill, headColors)"
        />
      </g>

      <!-- Face - positioned relative to body -->
      <g
        v-if="face"
        id="Face"
        transform="translate(760, 95)"
      >
        <path
          v-for="(path, i) in face.paths"
          :key="'face-' + i"
          :d="path.d"
          :fill="resolveColor(path.fill, faceColors)"
        />
      </g>

      <!-- Beard - positioned relative to body -->
      <g
        v-if="beard"
        id="Beard"
        :transform="`translate(${725 + getBeardOffset(avatar.beard).x}, ${250 + getBeardOffset(avatar.beard).y})${getBeardOffset(avatar.beard).scale ? ` scale(${getBeardOffset(avatar.beard).scale})` : ''}`"
      >
        <path
          v-for="(path, i) in beard.paths"
          :key="'beard-' + i"
          :d="path.d"
          :fill="resolveColor(path.fill, beardColors)"
        />
      </g>

      <!-- Accessory - positioned relative to body -->
      <g
        v-if="accessory"
        id="Accessory"
        :transform="`translate(${650 + getAccessoryOffset(avatar.accessory).x}, ${150 + getAccessoryOffset(avatar.accessory).y})`"
      >
        <path
          v-for="(path, i) in accessory.paths"
          :key="'accessory-' + i"
          :d="path.d"
          :fill="resolveColor(path.fill, accessoryColors)"
        />
      </g>
    </svg>
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
  height: auto;
  max-height: 300px;
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
