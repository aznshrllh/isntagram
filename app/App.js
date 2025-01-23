import { ApolloProvider } from "@apollo/client";
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
