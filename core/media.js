export const cloudinaryUpload = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const timestamp = Math.ceil(Date.now() / 1000)
  const body = new FormData()
  body.append('file', file)
  body.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
  body.append('timestamp', timestamp)

  const signaturePayload = {
    params: {
      timestamp
    }
  }
  const signatureRes = await
    fetch(
      '/api/media/sign',
      { method: 'POST', body: JSON.stringify(signaturePayload) }
    )
    .then(res => {
      let payload = res.json()
      if (payload.error) {
        throw new Error(payload.error.message)
      }
      return payload
    })
    .catch(err => {
      console.error(err)
      return null
    })

  if (signatureRes == null) {
    throw new Error('Signing failed')
  }

  body.append('signature', signatureRes.sig)

  return fetch(url, { body, method: 'POST' })
    .then(res => {
      let payload = res.json()

      if ('error' in payload) {
        throw new Error(payload.error)
      }

      return payload
    })
}
