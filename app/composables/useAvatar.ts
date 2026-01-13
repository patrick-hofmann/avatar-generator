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

  async function saveAvatar(updates: AvatarUpdate) {
    if (!avatar.value) return

    saving.value = true
    try {
      const data = await $fetch<Avatar>(`/api/avatars/${nameValue.value}`, {
        method: 'PUT',
        body: updates,
      })
      avatar.value = data
    }
    catch (e) {
      error.value = e as Error
    }
    finally {
      saving.value = false
    }
  }

  const debouncedSave = useDebounceFn((updates: AvatarUpdate) => {
    saveAvatar(updates)
  }, 500)

  function updateAvatar(key: keyof AvatarUpdate, value: string) {
    if (!avatar.value) return

    avatar.value = {
      ...avatar.value,
      [key]: value,
    }
    debouncedSave({ [key]: value })
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
