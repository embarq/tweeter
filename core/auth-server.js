import * as admin from 'firebase-admin'

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    const firebasePrivateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

  if (token) {
    return admin
      .auth()
      .verifyIdToken(token)
      .catch((error) => {
        throw error
      })
  }
}
