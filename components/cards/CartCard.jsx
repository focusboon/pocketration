import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartCard({
  image,
  title,
  category,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const total = (price * quantity).toFixed(1);

  return (
    <View className="bg-white rounded-3xl flex-row items-center p-3 mb-4 shadow-sm">
      {/* Image */}
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-2xl"
        resizeMode="cover"
      />

      {/* Info */}
      <View className="flex-1 px-3">
        <Text className="text-xs text-gray-400 font-medium">
          {category.toUpperCase()}
        </Text>
        <Text className="font-semibold text-base">{title}</Text>

        <View className="flex-row items-center mt-1">
          <View className="bg-orange-300 px-2 py-1 rounded-lg mr-2">
            <Text className="text-white text-xs font-bold">${price}</Text>
          </View>
          <Text className="text-orange-500 font-bold">${total}</Text>
        </View>
      </View>

      {/* Controls */}
      <View className="items-center justify-center gap-y-1">
        <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
          <TouchableOpacity onPress={onDecrement}>
            <Ionicons name="remove" size={18} color="gray" />
          </TouchableOpacity>
          <Text className="px-2 font-semibold">{quantity}</Text>
          <TouchableOpacity onPress={onIncrement}>
            <Ionicons name="add" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {onRemove && (
          <TouchableOpacity
            onPress={onRemove}
            className="bg-black p-2 mt-1 rounded-full"
          >
            <Ionicons name="trash-outline" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
