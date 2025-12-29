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
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= ELEMENTS =================
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userNameBox = document.getElementById("userName");
const uploadBtn = document.getElementById("uploadBtn");

// ================= GLOBAL USER =================
let currentUser = null;

// ================= AUTH STATE =================
onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    // 🔐 LOGGED IN
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // 👋 Welcome text
      if (userNameBox) {
        userNameBox.innerText = `Welcome, ${data.name} 👋`;
      }

      // 🛡 Admin check
      if (data.role === "admin") {
        uploadBtn.style.display = "inline-block";
      } else {
        uploadBtn.style.display = "none";
      }
    }
  } else {
    // ❌ LOGGED OUT
    currentUser = null;
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (uploadBtn) uploadBtn.style.display = "none";
    if (userNameBox) userNameBox.innerText = "";
  }
});

// ================= LOGOUT =================
window.logout = async function () {
  await signOut(auth);
  window.location.href = "logsign.html";
};

// ================= PDF PROTECTION =================
window.openPDF = function (pdfName) {
  if (!currentUser) {
    alert("Login required to download PDF");
    window.location.href = "logsign.html";
    return;
  }

  window.open(`pdfs/${pdfName}`, "_blank");
};

// ================= ADMIN ACTION =================
if (uploadBtn) {
  uploadBtn.onclick = () => {
    alert("Admin Upload Panel - Coming Soon!");
  };
}
