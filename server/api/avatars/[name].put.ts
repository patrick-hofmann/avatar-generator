import type { Avatar, AvatarUpdate } from '../../../shared/types/avatar'
import { createDefaultAvatar } from '../../utils/avatarDefaults'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')?.toLowerCase()

  if (!name || !/^[a-z0-9_-]+$/.test(name)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid avatar name. Use only lowercase letters, numbers, hyphens, and underscores.',
    })
  }

  const body = await readBody<AvatarUpdate>(event)
  const storage = useStorage('avatars')

  // Get existing or create new
  const existing = await storage.getItem<Avatar>(`${name}.json`)
  const defaultAvatar = createDefaultAvatar(name)

  const avatar: Avatar = {
    ...defaultAvatar,
    ...existing,
    ...body,
    name,
    createdAt: existing?.createdAt ?? defaultAvatar.createdAt,
    updatedAt: new Date().toISOString(),
  }

  await storage.setItem(`${name}.json`, avatar)

  return avatar
})
