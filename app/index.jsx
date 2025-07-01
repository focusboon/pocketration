import { useAuth } from "@/contexts/AuthContext";
import { Redirect} from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect logic
  if (!userData) {
    return <Redirect href="/auth" />;
  }

  // For authenticated userDatas, render the app content
  return <Redirect href="/home" />;
}