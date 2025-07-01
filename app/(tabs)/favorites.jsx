import ProductCard from "@/components/cards/ProductCard";
import { addStorage, getStorage } from "@/utils/Storage";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const loadFavorites = async () => {
    setLoading(true);
    const favs = (await getStorage("myfav")) || [];
    setFavorites(favs);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) loadFavorites();
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleRemoveAll = async () => {
    await addStorage("myfav", []);
    setFavorites([]);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-5">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold">My Favorites</Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleRemoveAll}>
            <Text className="text-orange-500 font-semibold">Remove All</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-gray-500">
            No favorite items
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard key={item.id} data={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
