import type { Avatar } from '../../../shared/types/avatar'
import { createDefaultAvatar, defaultAvatarValues } from '../../utils/avatarDefaults'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')?.toLowerCase()

  if (!name || !/^[a-z0-9_-]+$/.test(name)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid avatar name. Use only lowercase letters, numbers, hyphens, and underscores.',
    })
  }

  const storage = useStorage('avatars')
  const stored = await storage.getItem<Partial<Avatar>>(`${name}.json`)

  if (!stored) {
    // Return default avatar for new names
    return createDefaultAvatar(name)
  }

  // Merge with defaults to handle schema migrations
  const avatar: Avatar = {
    name: stored.name || name,
    createdAt: stored.createdAt || new Date().toISOString(),
    updatedAt: stored.updatedAt || new Date().toISOString(),
    ...defaultAvatarValues,
    body: stored.body || defaultAvatarValues.body,
    head: stored.head || defaultAvatarValues.head,
    face: stored.face || defaultAvatarValues.face,
    beard: stored.beard ?? defaultAvatarValues.beard,
    accessory: stored.accessory ?? defaultAvatarValues.accessory,
    skinColor: stored.skinColor || defaultAvatarValues.skinColor,
    topColor: stored.topColor || defaultAvatarValues.topColor,
    pantsColor: stored.pantsColor || defaultAvatarValues.pantsColor,
    shoesColor: stored.shoesColor || defaultAvatarValues.shoesColor,
  }

  return avatar
})
