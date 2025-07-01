import { addStorage, getStorage } from "@/utils/Storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native"; // 👈 Add this

const ProductCard = ({ data }) => {
  const router = useRouter();
  const [inCart, setInCart] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const isFocused = useIsFocused(); // 👈 Detect focus

  // Re-check status every time screen is focused
  useEffect(() => {
    checkStatus();
    /* eslint-disable-next-line */
  }, [isFocused]); // 👈 Depend on focus

  const checkStatus = async () => {
    const cart = (await getStorage("mycart")) || [];
    const favs = (await getStorage("myfav")) || [];
    setInCart(cart.some((item) => item.id === data.id));
    setIsFav(favs.some((item) => item.id === data.id));
  };

  const handleAddCart = async () => {
    const cart = (await getStorage("mycart")) || [];
    if (inCart) {
      const updated = cart.filter((item) => item.id !== data.id);
      await addStorage("mycart", updated);
      setInCart(false);
    } else {
      const newItem = {
        id: data.id,
        title: data.name,
        category: data.category,
        price: data.price,
        quantity: 1,
        image: data.img,
      };
      await addStorage("mycart", [...cart, newItem]);
      setInCart(true);
    }
  };

  const handleFavorite = async () => {
    const favs = (await getStorage("myfav")) || [];
    if (isFav) {
      const updated = favs.filter((item) => item.id !== data.id);
      await addStorage("myfav", updated);
      setIsFav(false);
    } else {
      await addStorage("myfav", [...favs, data]);
      setIsFav(true);
    }
  };

  return (
    <View className="mb-4 w-[48%]">
      <View className="rounded-2xl overflow-hidden">
        <TouchableOpacity onPress={() => router.push(`/product/${data.id}`)}>
          <Image source={{ uri: data?.img }} className="w-full h-48 bg-[#fffdd0] " />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={handleFavorite}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={30}
            color="#f97316"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/product/${data.id}`)}
        className="p-3"
      >
        <Text className="font-semibold">{data?.name}</Text>
        <Text className="text-2xl font-extrabold">₹{data?.price}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAddCart}
        className={`py-3 rounded-full border items-center ${
          inCart ? "border-red-600 " : "border-orange-500 "
        }`}
      >
        <Text
          className={`${
            inCart ? "text-red-600" : "text-orange-500"
          } font-semibold`}
        >
          {inCart ? "Remove from cart" : "Add to cart"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
