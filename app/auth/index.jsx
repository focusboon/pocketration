import React from "react";
import { Image, Text, View } from "react-native";
import Home from "../../assets/images/home.png";
import AuthButtonCard from "@/components/generals/AuthButtonCard";

export default function HomeScreen() {
  return (
    <View className="flex-1 p-5 pt-20 flex flex-col justify-between">
     <View style={{ width: 320, height: 250 }} className="flex justify-center items-center">  
      <Image 
        source={Home} 
        resizeMode="cover" 
        style={{ 
          width: '100%', 
          height: '100%',
        }} 
      />
    </View>
      <Text className="text-2xl font-bold text-center my-2 mt-10">
        Fast and responsibily delivery services{" "}
      </Text>
      <Text className="text-lg text-center">
        Our couriers provide fast deliveries with packaging tracking for orders.
      </Text>
      <View>
        <AuthButtonCard url={'/auth/create-account'} text={'Create an account'} />
        <AuthButtonCard url={'/auth/sign-in'} text={'Sign in'}  type="type-b"/>
      </View>
    </View>
  );
}
