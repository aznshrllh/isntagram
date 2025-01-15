import { ObjectId } from "mongodb";
import database from "../config/mongoDB.js";

export default class PostModel {
  static collection() {
    return database.collection("posts");
  }

  static async createPost(newPost, authorId) {
    try {
      const post = await this.collection().insertOne({
        ...newPost,
        authorId: new ObjectId(authorId),
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return {
        ...newPost,
        _id: post.insertedId,
        authorId: new ObjectId(authorId),
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getPosts() {
    //arrange posts by date
    try {
      const posts = await this.collection().find().sort({ date: -1 }).toArray();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findPostById(id) {
    try {
      const post = await this.collection().findOne({ _id: new ObjectId(id) });
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findPostByUserId(userId) {
    try {
      const posts = await this.collection()
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deletePostById(id, userId) {
    try {
      console.log("id", id);
      console.log("authorId", userId);
      const post = await this.collection().findOne({ _id: new ObjectId(id) });
      const author = userId.toString();
      if (post.authorId.toString() !== author) {
        throw new Error("Unauthorized");
      }
      await this.collection().deleteOne({ _id: new ObjectId(id) });
      return { message: "Post deleted", post: post.value };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addCommentToPost(postId, comment) {
    try {
      const post = await this.collection().findOneAndUpdate(
        { _id: new ObjectId(postId) },
        {
          $push: { comments: comment },
          $set: { updatedAt: new Date().toISOString() },
        },
        { returnDocument: "after" }
      );
      return post.value;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async likePost(postId, userId) {
    try {
      const post = await this.collection().findOneAndUpdate(
        { _id: new ObjectId(postId) },
        {
          $addToSet: { likes: userId },
          $set: { updatedAt: new Date().toISOString() },
        },
        { returnDocument: "after" }
      );
      return post.value;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async unlikePost(postId, userId) {
    try {
      const post = await this.collection().findOneAndUpdate(
        { _id: new ObjectId(postId) },
        {
          $pull: { likes: userId },
          $set: { updatedAt: new Date().toISOString() },
        },
        { returnDocument: "after" }
      );
      return post.value;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async isLikedByUser(postId, userId) {
    try {
      const post = await this.collection().findOne({
        _id: new ObjectId(postId),
        likes: userId,
      });
      return post ? true : false;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async toggleLikePost(postId, userId) {
    try {
      if (await this.isLikedByUser(postId, userId)) {
        return await this.unlikePost(postId, userId);
      } else {
        return await this.likePost(postId, userId);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
