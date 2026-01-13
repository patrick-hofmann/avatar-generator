import type { Avatar, AvatarUpdate } from '../../shared/types/avatar'
import { useDebounceFn } from '@vueuse/core'

export function useAvatar(name: MaybeRef<string>) {
  const avatar = ref<Avatar | null>(null)
  const loading = ref(true)
  const error = ref<Error | null>(null)
  const saving = ref(false)

  const nameValue = computed(() => toValue(name))

  async function fetchAvatar() {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Avatar>(`/api/avatars/${nameValue.value}`)
      avatar.value = data
    }
    catch (e) {
      error.value = e as Error
    }
    finally {
      loading.value = false
    }
  }

  // Accumulate pending changes for batch save
  const pendingChanges = ref<AvatarUpdate>({})

  async function saveAvatar() {
    if (!avatar.value || Object.keys(pendingChanges.value).length === 0) return

    const updates = { ...pendingChanges.value }
    pendingChanges.value = {}

    saving.value = true
    try {
      await $fetch(`/api/avatars/${nameValue.value}`, {
        method: 'PUT',
        body: updates,
      })
      // Don't update local state - we already have the optimistic update
    }
    catch (e) {
      error.value = e as Error
      // On error, refetch to get correct state
      fetchAvatar()
    }
    finally {
      saving.value = false
    }
  }

  const debouncedSave = useDebounceFn(() => {
    saveAvatar()
  }, 500)

  function updateAvatar(key: keyof AvatarUpdate, value: string) {
    if (!avatar.value) return

    // Optimistic local update
    avatar.value = {
      ...avatar.value,
      [key]: value,
    }

    // Accumulate changes
    pendingChanges.value = {
      ...pendingChanges.value,
      [key]: value,
    }

    debouncedSave()
  }

  // Watch for name changes
  watch(nameValue, () => {
    fetchAvatar()
  }, { immediate: true })

  return {
    avatar,
    loading,
    error,
    saving,
    fetchAvatar,
    updateAvatar,
  }
}
