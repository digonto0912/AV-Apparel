"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { addRewardsPoints } from "@/lib/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signUp = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const profile = {
      uid: cred.user.uid,
      email,
      displayName,
      role: "customer",
      addresses: [],
      phone: "",
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", cred.user.uid), profile);
    setUserProfile(profile);
    // Welcome bonus: 50 points for signing up
    try {
      await addRewardsPoints(cred.user.uid, 50, "Welcome bonus — thanks for joining!");
    } catch (e) {
      console.error("Failed to add welcome bonus:", e);
    }
    return cred.user;
  };

  const signIn = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const profileDoc = await getDoc(doc(db, "users", cred.user.uid));
    if (profileDoc.exists()) {
      setUserProfile(profileDoc.data());
    }
    return cred.user;
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    const newProfile = { ...userProfile, ...updates };
    await setDoc(doc(db, "users", user.uid), newProfile, { merge: true });
    setUserProfile(newProfile);
    if (updates.displayName) {
      await updateProfile(user, { displayName: updates.displayName });
    }
  };

  const isAdmin = userProfile?.role === "admin";

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updateUserProfile,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
