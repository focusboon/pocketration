import CartCard from "@/components/cards/CartCard";
import { addStorage, getStorage, deleteStorage } from "@/utils/Storage";
import React, { useState, useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCart = async () => {
    setLoading(true);
    const storedItems = await getStorage("mycart");
    if (storedItems) setCartItems(storedItems);
    else setCartItems([]);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const handleIncrement = (id) => {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      addStorage("mycart", updated);
      return updated;
    });
  };

  const handleDecrement = (id) => {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      addStorage("mycart", updated);
      return updated;
    });
  };

  const handleRemove = (id) => {
    setCartItems((items) => {
      const updated = items.filter((item) => item.id !== id);
      addStorage("mycart", updated);
      return updated;
    });
  };

  const handleRemoveAll = async () => {
    await deleteStorage("mycart");
    setCartItems([]);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold">My Cart</Text>
        {cartItems.length > 0 &&<TouchableOpacity onPress={handleRemoveAll}>
          <Text className="text-red-500 font-semibold">Remove All</Text>
        </TouchableOpacity>}
      </View>

      {/* Loading State */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-gray-500">
            Your cart is empty
          </Text>
        </View>
      ) : (
        <>
          {/* Cart List */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartCard
                key={item.id}
                {...item}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Place Order Button */}
          <TouchableOpacity
            onPress={() => router.push("/order-now")}
            className="bg-orange-500 mt-6 mb-4 py-4 rounded-full items-center"
          >
            <Text className="text-white font-bold text-base">Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
