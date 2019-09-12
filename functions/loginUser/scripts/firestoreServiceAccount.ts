import admin from "firebase-admin";

export const serviceAccount: admin.ServiceAccount = {
  // type: "service_account",
  projectId: "project-coco-251813",
  // private_key_id: "9f7980a9b9577ff47c86c73af2eab31a19db5c45",
  privateKey: (process.env.FIRESTORE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  clientEmail:
    "firebase-adminsdk-1kagq@project-coco-251813.iam.gserviceaccount.com",
  // client_id: "117869616798050404891",
  // auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  // client_x509_cert_url:
  //   "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1kagq%40project-coco-251813.iam.gserviceaccount.com",
};
