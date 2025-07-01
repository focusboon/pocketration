import { auth, db } from "@/utils/Firebase";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !userData) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const fullUser = {
              uid: user.uid,
              email: user.email,
              ...userSnap.data(),
            };
            setUserData(fullUser);
             router.push('/')
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Failed to fetch user doc:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔐 Sign up
  const signUp = async (email, password, extraData) => {
    setLoading(true);
    try {
      // 1. Create Firebase Auth user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      // 2. Normalize email as Firestore doc ID
      const safeEmail = email.toLowerCase().replace(/\./g, "(dot)");

      // 3. Run transaction to write both docs atomically
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", uid);
        const emailRef = doc(db, "emails", safeEmail);

        transaction.set(userRef, {
          ...extraData,
          email,
          createdAt: serverTimestamp(),
        });

        transaction.set(emailRef, {
          uid,
          email,
          createdAt: serverTimestamp(),
        });
      });

      setUserData(res.user);
      return { success: true, user: res.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Sign in
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUserData(res.user);
      return { success: true, user: res.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserData(null);
      router.push('/')
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const values = {
    userData,
    loading,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
