import {atom} from 'recoil'

export const atomFactory = (topic = 'global') =>
  (key, value = null) => atom({ key: topic + '_' + key, default: value })

export const getCloudinaryUrl = id => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${id}`
}
