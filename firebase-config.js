// CFT's Firebase web app settings. These values are public by design;
// access to member data is protected by login and the Firestore security rules.
window.CFT_FIREBASE = {
  apiKey: "AIzaSyC8O4drDzJ_7iXj6T_ezqD3EuslgRijgCQ",
  authDomain: "cft-tanzania.firebaseapp.com",
  projectId: "cft-tanzania",
  storageBucket: "cft-tanzania.firebasestorage.app",
  messagingSenderId: "244889001040",
  appId: "1:244889001040:web:ecdfca5ab15af0f9f30555"
};

// Who can read the Inbox and post news. Must match the list in the Firestore rules.
window.CFT_ADMINS = ["david.gunda@gmail.com", "7171jeff@gmail.com"];

// CFT's WhatsApp number for the green chat button (e.g. "255712345678"). Leave empty to hide the button.
window.CFT_WHATSAPP = "36707201643";
