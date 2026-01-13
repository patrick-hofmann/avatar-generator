<script setup lang="ts">
const avatarName = ref('')
const router = useRouter()

function createAvatar() {
  const name = avatarName.value.toLowerCase().trim()
  if (name && /^[a-z0-9_-]+$/.test(name)) {
    router.push(`/${name}`)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    createAvatar()
  }
}
</script>

<template>
  <main class="landing">
    <h1>Avatar Generator</h1>
    <p>Erstelle deinen eigenen Avatar!</p>

    <div class="create-form">
      <input
        v-model="avatarName"
        type="text"
        placeholder="Dein Name..."
        pattern="[a-zA-Z0-9_-]+"
        maxlength="30"
        @keydown="handleKeydown"
      >
      <button
        type="button"
        :disabled="!avatarName.trim()"
        @click="createAvatar"
      >
        Avatar erstellen
      </button>
    </div>
  </main>
</template>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  gap: var(--space-lg);
  text-align: center;
  padding: var(--space-md);
}

.landing h1 {
  font-size: 2rem;
  color: var(--text-primary);
}

.landing p {
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
  max-width: 300px;
}
</style>
