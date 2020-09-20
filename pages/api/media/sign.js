import * as cloudinary from 'cloudinary'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Undefined endpoint' })
  }

  try {
    let { params } = JSON.parse(req.body)
    let sig = cloudinary.v2.utils.api_sign_request(
      params,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    )
    res.status(200).json({ sig })
  } catch(err) {
    console.error(err)
    res.status(500).json({ message: 'Signature error' })
  }
}
