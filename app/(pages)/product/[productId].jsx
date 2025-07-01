import IconCard from "@/components/cards/IconCard";
import TopBar from "@/components/generals/TopBar";
import { productData } from "@/data/productData";
import { addStorage, getStorage } from "@/utils/Storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Product() {
  const { productId } = useLocalSearchParams();
  const [inCart, setInCart] = useState(false);
  const [isFav, setIsFav] = useState(false);

  // Find product from productData
  const findProductById = (productId) => {
    for (const category in productData) {
      const product = productData[category].products.find(
        (item) => item.id === productId
      );
      if (product) return product;
    }
    return null;
  };

  const product = findProductById(productId);

  useEffect(() => {
    checkStatus();
    /* eslint-disable-next-line */
  }, []);

  const checkStatus = async () => {
    const cart = (await getStorage("mycart")) || [];
    const favs = (await getStorage("myfav")) || [];
    setInCart(cart.some((item) => item.id === product.id));
    setIsFav(favs.some((item) => item.id === product.id));
  };

  const handleToggleCart = async () => {
    const cart = (await getStorage("mycart")) || [];
    if (inCart) {
      const updated = cart.filter((item) => item.id !== product.id);
      await addStorage("mycart", updated);
      setInCart(false);
    } else {
      const newItem = {
        id: product.id,
        title: product.name,
        category: product.category,
        price: product.price,
        quantity: 1,
        image: product.img,
      };
      await addStorage("mycart", [...cart, newItem]);
      setInCart(true);
    }
  };

  const handleToggleFavorite = async () => {
    const favs = (await getStorage("myfav")) || [];
    if (isFav) {
      const updated = favs.filter((item) => item.id !== product.id);
      await addStorage("myfav", updated);
      setIsFav(false);
    } else {
      await addStorage("myfav", [...favs, product]);
      setIsFav(true);
    }
  };

  if (!product) {
    return (
      <View className="flex-1 bg-white p-4 justify-center items-center">
        <Text className="text-lg text-gray-600">Product not found</Text>
      </View>
    );
  }

  const { name, price, description, img, rating, reviews } = product;

  return (
    <View className="flex-1 bg-white">
      <TopBar title={name} />
      <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
        <Image source={{ uri: img }} className="w-full h-[18rem] rounded-lg" />
        <Text className="text-2xl font-semibold mt-4">{name}</Text>
        <Text className="text-2xl font-extrabold mt-2">₹{price}</Text>
        <Text className="text-sm text-gray-700 mt-4">{description}</Text>
        <View className="flex-row items-center mt-4">
          <Text className="text-sm">Rating: {rating}</Text>
          <Text className="text-sm ml-2">({reviews} reviews)</Text>
        </View>

        <View className="flex flex-row gap-3">
          <TouchableOpacity
            onPress={handleToggleFavorite}
            className="mt-4 py-2 w-max rounded-full"
          >
            <IconCard
              name={isFav ? "heart" : "heart-outline"}
              type={"ionic"}
              size={30}
              color="#f97316"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleToggleCart}
            className={`mt-4 flex-1 justify-center items-center py-3 rounded-full ${
              inCart ? "bg-red-600" : "bg-orange-500"
            }`}
          >
            <Text className="text-white font-semibold">
              {inCart ? "Remove from Cart" : `Add to Cart ₹${price}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
