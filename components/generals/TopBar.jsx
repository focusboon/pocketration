import React from "react";
import { Text, View } from "react-native";
import Back from "./Back";

export default function TopBar({ title }) {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
      <Back />
      <Text className="text-lg font-bold flex-1 text-center capitalize">{title}</Text>
      <View className="w-6" />
    </View>
  );
}
