import React from "react";
import { Text, View } from "react-native";
import IconCard from "./IconCard";

export default function NotificationCard({ data }) {
  // Define a function to return the appropriate icon based on the type
  const renderIcon = (type) => {
    switch (type) {
      case "order":
        return <IconCard name="cart" type={'ionic'} size={20} color="#4CAF50" />;
      case "shipping":
        return <IconCard name="car-sharp" size={20} type={'ionic'} color="#2196F3" />;
      case "stock":
        return <IconCard name="shopping-package" size={20} type={'fontisto'} color="#FFC107" />;
      case "discount":
        return <IconCard name="shopping-sale" size={20} type={'fontisto'} color="#FF5722" />;
      case "sale":
        return <IconCard name="shopping-sale" size={20} type={'fontisto'}  color="#9C27B0" />;
      case "payment":
        return <IconCard name="credit-card" size={20} type={'entypo'} color="#009688" />;
      case "profile":
        return <IconCard name="user" size={20} type={'entypo'} color="#3F51B5" />;
      case "review":
        return <IconCard name="star" size={20} type={'ionic'} color="#FF9800" />;
      case "feedback":
        return <IconCard name="comment" size={20} type={'community'} color="#607D8B" />;
      default:
        return <IconCard name="bell-ring" size={20} type={'community'} color="#000" />;
    }
  };

  return (
    <View className="mb-4 p-4 rounded-lg shadow-sm flex-row items-center">
      {renderIcon(data.type)}
      <View className="ml-3">
        <Text className="text-lg font-semibold">{data.title}</Text>
        <Text className="text-sm text-gray-500">{data.description}</Text>
        <Text className="text-xs text-gray-400">{data.timestamp}</Text>
      </View>
    </View>
  );
}
