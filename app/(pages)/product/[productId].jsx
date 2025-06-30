import IconCard from "@/components/cards/IconCard";
import TopBar from "@/components/generals/TopBar";
import { productData } from "@/data/productData";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Product() {
  const { productId } = useLocalSearchParams();
  const findProductById = (productId) => {
    for (const category in productData) {
      const categoryProducts = productData[category].products;
      const product = categoryProducts.find((item) => item.id === productId);
      if (product) {
        return product;
      }
    }

    return null;
  };

  const product = findProductById(productId);

  if (!product) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text>Product not found</Text>
      </View>
    );
  }

  const { name, price, description, img, rating, reviews } = product;

  return (
    <View className="flex-1 bg-white">
      <TopBar title={name} />
      <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
        <Image source={{ uri: img }} className="w-full h-64 rounded-lg" />
        <Text className="text-2xl font-semibold mt-4">{name}</Text>
        <Text className="text-lg text-gray-500 mt-2">₹{price}</Text>
        <Text className="text-sm text-gray-700 mt-4">{description}</Text>
        <View className="flex-row items-center mt-4">
          <Text className="text-sm">Rating: {rating}</Text>
          <Text className="text-sm ml-2">({reviews} reviews)</Text>
        </View>
       <View className="flex flex-row gap-3">
          <TouchableOpacity className="mt-4 py-2 w-max  rounded-full">
           <IconCard name="heart-outline" type={'ionic'} size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="mt-4 bg-black flex-1 justify-center items-center py-2 rounded-full">
            <Text className="text-center text-white font-semibold">
              Add to Cart ₹{price}
            </Text>
          </TouchableOpacity>
       </View>
      </ScrollView>
    </View>
  );
}
