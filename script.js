// ===== Firebase imports =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Firebase config (APNA ORIGINAL CONFIG PASTE KARO) =====
const firebaseConfig = {
  apiKey: "AIzaSyCFsSOk-HfD6pwZXO5XEW6YKJG1ipA5XnQ",
  authDomain: "kartik-book-publication.firebaseapp.com",
  projectId: "kartik-book-publication",
  appId: "1:354471030726:web:09a2b8bebf367b35b20cc7",
  storageBucket: "kartik-book-publication.appspot.com",
  messagingSenderId: "354471030726",
};

// ===== Initialize =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= SIGNUP =================
window.signup = async function () {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
    });

    alert("Signup successful 🎉");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

// ================= LOGIN =================
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful ✅");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};
