import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CatCard = ({ data }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/categories/${data.name}`)}>
      <View className="w-20 h-20 rounded-xl overflow-hidden bg-[#fffdd0] justify-center items-center mr-4">
        <Image source={{ uri: data?.img }} className="w-full h-full" />
      </View>
      <Text className="text-xs font-medium mt-1 -ml-2 text-center capitalize">
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CatCard;
