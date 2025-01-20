import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { client } from "./config/apollo";
import { AuthContextProvider } from "./contexts/auth";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./routes/StackNav";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
