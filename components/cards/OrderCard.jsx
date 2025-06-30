import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const OrderCard = ({ title, items, total, date, onReorder }) => {
  return (
    <View className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
      <Text className="text-lg font-semibold">{title}</Text>
      <Text className="text-sm text-gray-500">Date: {date}</Text>
      <View className="mt-2">
        {items.map((item, index) => (
          <Text key={index} className="text-sm">
            {item.name} x {item.quantity} - ${item.price}
          </Text>
        ))}
      </View>
      <Text className="mt-2 text-lg font-semibold">Total: ${total}</Text>
      <TouchableOpacity
        onPress={onReorder}
        className="mt-4 bg-orange-500 py-2 px-4 rounded-full"
      >
        <Text className="text-white text-center">Reorder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCard;
