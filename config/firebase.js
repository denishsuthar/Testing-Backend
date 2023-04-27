import { config } from "dotenv";
config({
    path:"./config/config.env"
})
export const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SEND_ID,
    appId: process.env.FB_APP_ID
  };

