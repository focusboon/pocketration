import CartCard from "@/components/cards/CartCard";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1acae",
      title: "Banana",
      category: "Fruits",
      price: 7.2,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "ac2",
      title: "Broccoli",
      category: "Vegetables",
      price: 6.3,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "w1",
      title: "Banana",
      category: "Fruits",
      price: 7.2,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "ww2",
      title: "Broccoli",
      category: "Vegetables",
      price: 6.3,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "1rr",
      title: "Banana",
      category: "Fruits",
      price: 7.2,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "2rr",
      title: "Broccoli",
      category: "Vegetables",
      price: 6.3,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "3cx",
      title: "Grapes",
      category: "Fruits",
      price: 5.7,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
    {
      id: "4zs",
      title: "Oyster Mushroom",
      category: "Mushroom",
      price: 2.7,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww",
    },
  ]);

  const handleIncrement = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <View className="flex-1 bg-white px-4 pt-5">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold">My Cart</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-semibold">Order Now</Text>
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        // Display message if cart is empty
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-gray-500">Your cart is empty</Text>
        </View>
      ) : (
        // FlatList for non-empty cart
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
      )}
    </View>
  );
}
