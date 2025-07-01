import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { userData, logout } = useAuth();
  const router = useRouter();
  const menuItems = [
    { id: "1", title: "Edit Profile", icon: "create", onPress: () => router.push('/edit-profile') },
    { id: "2", title: "Settings", icon: "settings", onPress: () => router.push('/settings') },
    { id: "3", title: "Notifications", icon: "notifications", onPress: () => router.push('/notification') },
    { id: "5", title: "Address Book", icon: "book", onPress: () => router.push('/address')},
    { id: "7", title: "Support", icon: "help-circle", onPress: () => router.push('/support') },
    { id: "4", title: "Log Out", icon: "log-out", onPress: () => logout() },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-5 pb-14" showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center flex-col">
          <Image
            source={{ uri: 'https://plus.unsplash.com/premium_photo-1738980401923-c84c558e96b3?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
            className="mb-4 bg-slate-500"
          />
          <Text className="text-xl font-bold text-gray-900">
            {userData?.firstName}
          </Text>
          <Text className="text-sm text-gray-500">{userData?.email}</Text>
          <Text className="text-sm text-gray-500">{userData?.phone}</Text>
        </View>
        <View className="pb-10 mt-5">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => item.onPress()}
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
