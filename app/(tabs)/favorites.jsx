import ProductCard from "@/components/cards/ProductCard";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const favoriteData = [
  {
    id: "ygd8dd7-29fe-2r2rdf",
    name: "Avocado",
    price: 6.7,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    stock: 20,
    description: "Fresh and creamy avocado, perfect for salads and sandwiches.",
  },
  {
    id: "ytb9c3-29fe-2r2dxy",
    name: "Blueberry",
    price: 8.7,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww", // Same image URL as requested
    stock: 50,
    description:
      "Sweet and nutritious blueberries, great for smoothies and desserts.",
  },
  {
    id: "yd9h5f-29fe-2r2dfg",
    name: "Orange",
    price: 4.9,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww", // Same image URL as requested
    stock: 30,
    description:
      "Juicy oranges packed with vitamin C, perfect for a refreshing snack.",
  },
  {
    id: "ygt7z8-29fe-2r2dsf",
    name: "Mango",
    price: 5.3,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww", // Same image URL as requested
    stock: 25,
    description:
      "Sweet, juicy mangoes, great for eating fresh or in smoothies.",
  },
  {
    id: "yf3jj2-29fe-2r2dfr",
    name: "Pineapple",
    price: 7.2,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww", // Same image URL as requested
    stock: 15,
    description:
      "Tropical pineapples that are both sweet and tangy, perfect for grilling.",
  },
];

export default function FavoriteScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-5">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold">My Favorites</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-semibold">Remove All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard key={item.id} data={item} />}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 10,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
