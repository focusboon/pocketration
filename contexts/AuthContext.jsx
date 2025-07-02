import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load user from storage on app start
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const signUp = async (email, password, extraData = {}) => {
    setLoading(true);
    try {
      const usersRaw = await AsyncStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : {};

      if (users[email]) {
        throw new Error("User already exists");
      }

      const user = {
        email,
        password,
        ...extraData,
        createdAt: new Date().toISOString(),
      };

      users[email] = user;

      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserData(user);
      router.push("/");
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const usersRaw = await AsyncStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : {};

      const user = users[email];

      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserData(user);
      router.push("/");
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUserData(null);
      router.push("/");
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
