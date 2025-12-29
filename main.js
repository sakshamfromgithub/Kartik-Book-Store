// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyCFsSOk-HfD6pwZXO5XEW6YKJG1ipA5XnQ",
  authDomain: "kartik-book-publication.firebaseapp.com",
  projectId: "kartik-book-publication",
  appId: "1:354471030726:web:09a2b8bebf367b35b20cc7",
  storageBucket: "kartik-book-publication.appspot.com",
  messagingSenderId: "354471030726",
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= ELEMENTS =================
// ================= ELEMENTS =================
// ================= ELEMENTS =================
const uploadBtn = document.getElementById("uploadBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userNameBox = document.getElementById("userName");

// ================= AUTH STATE =================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("USER DATA:", data);

      userNameBox.innerText = `Welcome, ${data.name} 👋`;

      if (data.role === "admin") {
        uploadBtn.style.display = "inline-block";
      } else {
        uploadBtn.style.display = "none";
      }

      if (uploadBtn) {
        uploadBtn.onclick = () => {
          alert("Admin Upload Panel (next level 🚀)");
        };
      }
    }
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    userNameBox.innerText = "";
    uploadBtn.style.display = "none";
  }
});

// ================= LOGOUT =================
window.logout = async () => {
  await signOut(auth);
  window.location.href = "logsign.html";
};

// ================= ADMIN ACTION =================
uploadBtn.onclick = () => {
  alert("Admin Upload Panel 🔥");
};
