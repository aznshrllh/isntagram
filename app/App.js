import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { client } from "./config/apollo";
import { AuthContextProvider } from "./contexts/auth";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
          </View>
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
