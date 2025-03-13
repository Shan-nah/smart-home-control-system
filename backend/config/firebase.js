const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const path = require("path");
const fs = require("fs");

// Load Firebase credentials
const firebaseConfigPath = path.join(__dirname, "../firebase-adminsdk.json");

if (!fs.existsSync(firebaseConfigPath)) {
  console.error("❌ Firebase Admin SDK JSON file is missing!");
  process.exit(1);
}

const firebaseAdmin = initializeApp({
  credential: cert(require(firebaseConfigPath)),
});

const auth = getAuth(firebaseAdmin);

module.exports = { auth };
