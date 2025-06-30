import { Ionicons } from "@expo/vector-icons";  
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const menuItems = [
  { id: "1", title: "Edit Profile", icon: "create" },
  { id: "2", title: "Settings", icon: "settings" },
  { id: "3", title: "Notifications", icon: "notifications" },
  { id: "5", title: "Address Book", icon: "book" },
  { id: "6", title: "GST Details", icon: "document" },
  { id: "7", title: "Support", icon: "help-circle" },
  { id: "4", title: "Log Out", icon: "log-out" },
];

export default function ProfileScreen() {
  const user = {
    name: "Rafatul Islam",
    email: "rafatul@example.com",
    profilePic:
      "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 (234) 567-890",
  };

  const handleNavigate = (route) => {
    console.log("Navigate to:", route);
  };

  return (
    <View className="flex-1 bg-white">
 
      <ScrollView className="p-5 pb-14" showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center flex-col">
          <Image
            source={{ uri: user.profilePic }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
            className="mb-4"
          />
          <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-sm text-gray-500">{user.email}</Text>
          <Text className="text-sm text-gray-500">{user.phone}</Text>
        </View>
        <View className="pb-10 mt-5">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigate(item.title)}
              className="flex-row items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm"
            >
              <Ionicons name={item.icon} size={24} color="black" />
              <Text className="ml-4 text-lg font-semibold text-gray-900">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
