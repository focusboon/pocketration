// /@components/cards/ProductCard.jsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


const ProductCard = ({ data }) => {
  const router = useRouter();

  const handleAddCart = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="mb-4 w-[48%]">
      <View className="rounded-2xl overflow-hidden">
        <Image source={{ uri: data?.img }} className="w-full h-48" />
        <TouchableOpacity className="absolute top-2 right-2">
          <Ionicons name="heart-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/product/${data.id}`)}
        className="p-3"
      >
        <Text className=" font-semibold">{data?.name}</Text>
        
          <Text className=" text-sm">₹{data?.price}</Text>
        
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAddCart()}
        className="bg-black py-3 rounded-full items-center "
      >
        <Text className="text-white font-semibold">Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
