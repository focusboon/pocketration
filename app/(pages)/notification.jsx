import NotificationCard from "@/components/cards/NotificationCard";
import TopBar from "@/components/generals/TopBar";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Screen() {
  // Sample data for notifications
 const notifications = [
  { 
    id: 1, 
    title: "New Order", 
    description: "New order placed", 
    timestamp: "5 minutes ago", 
    type: "order" 
  },
  { 
    id: 2, 
    title: "Package Shipped", 
    description: "Your package has been shipped", 
    timestamp: "10 minutes ago", 
    type: "shipping" 
  },
  { 
    id: 3, 
    title: "Item Back in Stock", 
    description: "Item back in stock", 
    timestamp: "15 minutes ago", 
    type: "stock" 
  },
  { 
    id: 4, 
    title: "New Discount", 
    description: "New discount available", 
    timestamp: "30 minutes ago", 
    type: "discount" 
  },
  { 
    id: 5, 
    title: "Sale Ending Soon", 
    description: "Sale ends soon", 
    timestamp: "1 hour ago", 
    type: "sale" 
  },
  { 
    id: 6, 
    title: "Payment Success", 
    description: "Your payment was successful", 
    timestamp: "2 hours ago", 
    type: "payment" 
  },
  { 
    id: 7, 
    title: "Profile Updated", 
    description: "Profile updated", 
    timestamp: "3 hours ago", 
    type: "profile" 
  },
  { 
    id: 8, 
    title: "New Review", 
    description: "New review on your product", 
    timestamp: "4 hours ago", 
    type: "review" 
  },
  { 
    id: 9, 
    title: "Item Shipped", 
    description: "Item shipped", 
    timestamp: "5 hours ago", 
    type: "shipping" 
  },
  { 
    id: 10, 
    title: "Feedback Thank You", 
    description: "Thank you for your feedback", 
    timestamp: "6 hours ago", 
    type: "feedback" 
  },
];


  return (
    <View className="flex-1 bg-white">
      <TopBar title={"Notifications"} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-white px-4  pt-5">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} data={notification} />
        ))}
      </ScrollView>
    </View>
  );
}
