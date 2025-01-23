import { ActivityIndicator, FlatList, Text } from "react-native";
import { GET_POSTS } from "../operations/postOperation";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <ActivityIndicator size="large" color="black" />;
  if (error) return <Text>Error :{error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.getPosts}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({ item }) => <Card post={item} />}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
