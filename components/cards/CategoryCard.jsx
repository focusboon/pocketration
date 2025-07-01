import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CategoryCard({ data }) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/categories/${data.name}`)}>
      <View className="mb-5">
        <View className="w-40 h-40 rounded-xl overflow-hidden bg-[#fffdd0] justify-center items-center">
          <Image source={{ uri: data?.img }} className="w-full h-full" />
        </View>
        <Text className="text-xs font-medium mt-1 -ml-2 text-center capitalize">
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
