import IconCard from "@/components/cards/IconCard";
import ProductCard from "@/components/cards/ProductCard";
import TopBar from "@/components/generals/TopBar";
import { productData } from "@/data/productData";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Category = () => {
  const { category } = useLocalSearchParams();
  const [search, setSearch] = useState("");

  const categoryData = productData[category?.toLowerCase()];
  const products = categoryData?.products || [];

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1">
      <TopBar title={category} />
      <View className="flex-1 bg-white px-5 pb-12">
        {categoryData ? (
          <>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm mt-1">
                Total: {filteredProducts.length} items
              </Text>
              <TouchableOpacity>
                <IconCard
                  type="feather"
                  name="filter"
                  size={24}
                  color="#f97316"
                />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Search here"
              value={search}
              onChangeText={(text) => setSearch(text)}
              className="border rounded-full border-zinc-600 p-3 mt-4"
            />

            <View className="py-5">
              <FlatList
                data={filteredProducts}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => <ProductCard data={item} />}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                  <Text className="text-center text-gray-500 mt-10">
                    No items match your search.
                  </Text>
                }
              />
            </View>
          </>
        ) : (
          <Text className="text-center text-xl text-red-500 mt-4">
            Category not found
          </Text>
        )}
      </View>
    </View>
  );
};

export default Category;
