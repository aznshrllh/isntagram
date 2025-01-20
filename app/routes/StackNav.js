import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { AuthContext } from "../contexts/auth";

import AddPostScreen from "../screens/AddPostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import DetailPostScreen from "../screens/DetailPost";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import TabNav from "./TabNav";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const { loading, setLoading } = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setSignedIn(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    checkToken();
  }, [setSignedIn]);

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <Stack.Navigator>
      {signedIn ? (
        <>
          <Stack.Screen name="Home" component={TabNav} />
          <Stack.Screen name="AddPost" component={AddPostScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="DetailPost" component={DetailPostScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
