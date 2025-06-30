import ProductCard from "@/components/cards/ProductCard";
import TopBar from "@/components/generals/TopBar";
import { productData } from "@/data/productData";
import { useLocalSearchParams } from "expo-router";
import React from "react";

import { FlatList,  Text, TextInput, View } from "react-native";

const Category = () => {
  const { category } = useLocalSearchParams();

  const categoryData = productData[category?.toLowerCase()];

  return (
    <View className="flex-1 ">
      <TopBar title={category} />
      <View
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white px-5 pb-12 "
      >
        {categoryData && (
          <>
            <Text className="text-gray-500 text-sm mt-1">
              Total: {categoryData.products.length || 0} items
            </Text>

            <TextInput
              placeholder="Search here"
              className="border rounded-full border-zinc-600 b p-4 mt-4"
            />

            <View className="py-5">
              <FlatList
                data={categoryData?.products}
                keyExtractor={(item, index) => index}
                numColumns={2}
                renderItem={({ item }) => <ProductCard data={item} />}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  gap: 10,
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </View>
          </>
        )}
        {!categoryData && (
          <Text className="text-center text-xl text-red-500 mt-4">
            Category not found
          </Text>
        )}
      </View>
    </View>
  );
};

export default Category;
