import { LIKE_POST } from "../operations/postOperation";
import { GET_USER_BY_ID } from "../operations/userOperation";

export default function Card({ post }) {
  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
}
