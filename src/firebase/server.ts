import type { ServiceAccount } from "firebase-admin";
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Configuración del servicio con variables de entorno

const databaseURL = import.meta.env.FIREBASE_DATABASE_URL || "https://stlist-4402f.firebaseio.com";
const privateKey = import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

const activeApps = getApps();
console.log(activeApps.length)
if (!activeApps.length) {
  console.log("Initializing Firebase Admin SDK...");
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      //databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
      databaseURL
    });
    console.info("Firebase Admin initialized.");
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    throw error;
  }
} else {
  console.info("Firebase Admin SDK already initialized.");
}
// Exporta los servicios necesarios
const app = activeApps[0] || admin.app();
//console.log(app)
const db = admin.database();
/* const dbs = db;
console.log(dbs)
const starCountRef = dbs.ref('control/Henry/2022/7');
starCountRef.once("value", function (snapshot: any) {
  console.log("snapshot");
  console.log(snapshot.val());
}); */
export { admin, app, db };
