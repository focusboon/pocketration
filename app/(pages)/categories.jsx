import React from "react";
import { FlatList, View } from "react-native";
import CategoryCard from "@/components/cards/CategoryCard";  
import TopBar from "@/components/generals/TopBar";
import { productData } from "@/data/productData";

export default function Screen() {
 
  const categories = Object.values(productData);

  return (
    <View className="flex-1 bg-white">
      <TopBar title={"Categories"} />
      
      <View className="px-5">
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index}  
          numColumns={2} 
          renderItem={({ item }) => <CategoryCard data={item} />}
          showsVerticalScrollIndicator={false}  
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}
