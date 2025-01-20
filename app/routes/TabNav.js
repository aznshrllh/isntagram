import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
// import Foundation from '@expo/vector-icons/Foundation';
import { Feather, FontAwesome, Foundation } from "@expo/vector-icons";

import { AuthContext } from "../contexts/auth";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("username");
    authContext.setSignedIn(false);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Foundation name={iconName} size={size} color={color} />;
          } else if (route.name === "AddPost") {
            iconName = focused ? "plus-square" : "plus-square-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
            return <FontAwesome name={iconName} size={size} color={color} />;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
}
