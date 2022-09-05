import admin from "firebase-admin"

import serviceAccount from "./FirebaseSDKkeys.js"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;