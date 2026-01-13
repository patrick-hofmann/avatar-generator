import type { Avatar } from '../../../shared/types/avatar'
import { createDefaultAvatar } from '../../utils/avatarDefaults'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')?.toLowerCase()

  if (!name || !/^[a-z0-9_-]+$/.test(name)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid avatar name. Use only lowercase letters, numbers, hyphens, and underscores.',
    })
  }

  const storage = useStorage('avatars')
  const avatar = await storage.getItem<Avatar>(`${name}.json`)

  if (!avatar) {
    // Return default avatar for new names
    return createDefaultAvatar(name)
  }

  return avatar
})
