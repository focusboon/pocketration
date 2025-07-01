import TopBar from "@/components/generals/TopBar";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Screen() {
  return (
    <View className="flex-1 bg-white">
      <TopBar title={"Support"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white px-4  pt-5"
      >
        <Text className="">{'Support'}</Text>
      </ScrollView>
    </View>
  );
}
