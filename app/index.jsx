import { useAuth } from "@/contexts/AuthContext";
import { Redirect} from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect logic
  if (!user) {
    return <Redirect href="/auth" />;
  }

  // For authenticated users, render the app content
  return <Redirect href="/home" />;
}