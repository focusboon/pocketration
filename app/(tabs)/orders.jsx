import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OrderCard from "@/components/cards/OrderCard";  

export default function OrderScreen() {
  const [orders] = useState([
    {
      id: "1",
      title: "Order 1",
      items: [
        { name: "Banana", quantity: 2, price: 7.2 },
        { name: "Broccoli", quantity: 1, price: 6.3 },
      ],
      total: 20.7,
      date: "2023-07-12",
    },
    {
      id: "2",
      title: "Order 2",
      items: [
        { name: "Grapes", quantity: 3, price: 5.7 },
        { name: "Oyster Mushroom", quantity: 1, price: 2.7 },
      ],
      total: 21.1,
      date: "2023-07-13",
    },
  ]);

  const handleReorder = (id) => {
    // Add reorder functionality here, if applicable
    console.log(`Reordering Order ID: ${id}`);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-5">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold">My Orders</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-semibold">Track Order</Text>
        </TouchableOpacity>
      </View>

      {orders.length === 0 ? (
        // Display message if no orders exist
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-gray-500">Your orders are empty</Text>
        </View>
      ) : (
        // FlatList for orders
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <OrderCard
              key={item.id}
              {...item}
              onReorder={() => handleReorder(item.id)} // Pass reorder function to the OrderCard
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
