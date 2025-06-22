import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function Back() {
  const router = useRouter(); 

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      style={{
        padding: 8,
        alignSelf: "flex-start",
      }}
    >
      <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
    </TouchableOpacity>
  );
}
