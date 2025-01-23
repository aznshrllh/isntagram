import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LOGIN } from "../operations/userOperation";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { useMutation } from "@apollo/client";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleChange = (name, value) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    Alert.alert("Error", error.message);
  }

  const authContext = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const { data } = await login({
        variables: {
          email: user.email,
          password: user.password,
        },
      });

      if (data) {
        const { access_token, username, userId } = data.login;

        await SecureStore.setItemAsync("token", access_token);
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("userId", userId);

        authContext.setSignedIn(true);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.logoText}>Isntagram</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoFocus
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(value) => handleChange("password", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
    color: "#333",
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  button: {
    backgroundColor: "#3897f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#333",
  },
  registerLink: {
    color: "#3897f0",
    fontWeight: "bold",
  },
});
