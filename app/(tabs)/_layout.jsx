import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 60, 
          paddingBottom: 5,
          paddingTop: 5, 
          backgroundColor: "#fff", 
          elevation: 0, 
          shadowOpacity: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = "home-outline";
              break;
            case "cart":
              iconName = "cart-outline";
              break;
            case "orders":
              iconName = "receipt-outline";
              break;
            case "favorites":
              iconName = "heart-outline";
              break;
            case "profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
