import CatCard from "@/components/cards/CatCard"; // Adjust the import path as necessary
import ProductCard from "@/components/cards/ProductCard"; // Adjust the import path as necessary
import SliderCard from "@/components/cards/SliderCard"; // Adjust the import path as necessary
import { productData } from "@/data/productData";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const handleNavigate = (route) => {
    router.push(route);
  };

  const sliderData = [
    {
      id: 4,
      uri: "https://media.istockphoto.com/id/2061716709/photo/grilled-rib-burger.webp?a=1&b=1&s=612x612&w=0&k=20&c=OeRKfT736HFidM_TmreA8T8XRgzCs7vjVKx-uzJdRgE=",
    },
    {
      id: 1,
      uri: "https://media.istockphoto.com/id/1130112004/photo/vegan-detox-buddha-bowl-with-turmeric-roasted-chickpeas-greens-avocado-persimmon-blood-orange.webp?a=1&b=1&s=612x612&w=0&k=20&c=E7wgCRbClG2NoZrK3j99XYCi7T8JSHJCFAsVm0SvCmE=",
    },
    {
      id: 2,
      uri: "https://media.istockphoto.com/id/2195474569/photo/carrot-cake-cupcakes-for-easter-carrot-cupcakes-with-cream-cheese-frosting-decorated-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=NxWXJzWPQtqq3oyBCWxirOtxPeIo9KYB-7tdzpgl_0Y=",
    },
    {
      id: 3,
      uri: "https://media.istockphoto.com/id/2151094353/photo/rainbow-colored-fruits-and-vegetables-banner.webp?a=1&b=1&s=612x612&w=0&k=20&c=143dFz98CfuIh5GFQFxokgFg4gp9SlUDmhjL5fFMLno=",
    },
  ];

  return (
    <FlatList
      className="flex-1 bg-white px-4 pt-8 pb-5"
      showsVerticalScrollIndicator={false}
      data={[{ id: "header" }]} // Only one dummy header item
      keyExtractor={(item) => item.id}
      renderItem={() => (
        <View>
          {/* Header Section */}
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-gray-500 text-sm">Good Morning</Text>
              <Text className="text-lg font-bold">Rafatul Islam</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleNavigate("notification")}
              className="relative"
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
              <View className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
            </TouchableOpacity>
          </View>

          {/* Slider Section */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sliderData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SliderCard key={item.id} uri={item.uri} />
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
          />

          {/* Categories Section */}
          <View className="flex-row justify-between items-center mt-5 mb-3 ">
            <Text className="text-base font-semibold">Categories</Text>
            <TouchableOpacity onPress={() => handleNavigate("categories")}>
              <Feather name="arrow-right" size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Object.values(productData)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CatCard key={item.id} data={item} />}
            contentContainerStyle={{ paddingBottom: 10 }}
          />

          {/* Trending Deals */}
          <View className="flex-row justify-between items-center mt-5 mb-3">
            <Text className="text-base font-semibold">Trending Deals</Text>
            <TouchableOpacity
              onPress={() => handleNavigate("/categories/trending")}
            >
              <Feather name="arrow-right" size={20} />
            </TouchableOpacity>
          </View>

          {/* Product Grid */}
          <FlatList
            data={productData?.trending?.products?.slice(0, 4)}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard key={item.id} data={item} />}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />

          {/* More Button */}
          <TouchableOpacity
            onPress={() => handleNavigate("/categories/trending")}
            className="bg-black py-4 rounded-full items-center mb-16 mt-2"
          >
            <Text className="text-white font-semibold">More</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
