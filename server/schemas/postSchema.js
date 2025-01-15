import PostModel from "../models/postModel.js";

export const typeDefs = `#graphql
  type Post {
  _id: ID
  authorId: ID
  content: String
  imgUrl: String
  tags: [String]
  comments: [Comment]
  likes: [Like]
  createdAt: String
  updatedAt: String
  }
  
  type Comment {
  comment: String
  username: String
  createdAt: String
  updatedAt: String
  }

  type Like {
  username: String
  createdAt: String
  updatedAt: String
  }

  type Query {
  getPosts: [Post]
  getPost(id: ID!): Post
  getPostsByUser(userId: ID): [Post]
  }

  input PostInput {
  content: String
  imgUrl: String
  tags: [String]
  }

  type Mutation {
  createPost(newPost: PostInput): Post
  deletePost(id: ID!): Post
  addCommentToPost(postId: ID!, comment: String!): Post
  likePost(postId: ID!): Post
  }
  `;

export const resolvers = {
  Query: {
    getPosts: async () => {
      return await PostModel.getPosts();
    },
    getPost: async (_, args) => {
      const { id } = args;
      return await PostModel.findPostById(id);
    },
    getPostsByUser: async (_, args, contextValue) => {
      const user = await contextValue.authN();
      const { id } = args;
      const userId = id || user._id;
      return await PostModel.findPostByUserId(userId);
    },
  },

  Mutation: {
    createPost: async (_, args, contextValue) => {
      const { newPost } = args;
      const user = await contextValue.authN();
      const authorId = user._id;

      if (!authorId) throw new Error("User must be logged in to create a post");

      console.log("authorId", authorId);
      console.log("newPost", newPost);
      console.log("contextValue", contextValue);
      return await PostModel.createPost(newPost, authorId);
    },

    deletePost: async (_, args, contextValue) => {
      const { id } = args;
      const user = await contextValue.authN();
      const userId = user._id;

      if (!userId) throw new Error("User must be logged in to delete a post");
      await PostModel.deletePostById(id, userId);
      // return deletePost and message: "Post deleted"
      const deletePost = await PostModel.findPostById(id);
      return {
        ...deletePost,
        message: "Post deleted",
      };
    },

    addCommentToPost: async (_, args, contextValue) => {
      const { postId, comment } = args;
      const user = await contextValue.authN();
      const username = user.username;

      if (!username) throw new Error("User must be logged in to add a comment");
      await PostModel.addCommentToPost(postId, comment, username);

      const posted = await PostModel.findPostById(postId);
      // return postComment and message: "Comment added"
      return {
        ...posted,
        message: "Comment added",
      };
    },

    likePost: async (_, args, contextValue) => {
      const { postId } = args;
      const user = await contextValue.authN();
      const username = user.username;

      if (!username) throw new Error("User must be logged in to like a post");

      // if liked by user, unlike
      const post = await PostModel.findPostById(postId);
      const likedByUser = post.likes.find((like) => like.username === username);

      if (likedByUser) {
        await PostModel.unlikePost(postId, username);
        const unliked = await PostModel.findPostById(postId);
        // return postUnliked and message: "Post unliked"
        return {
          ...unliked,
          message: "Post unliked",
        };
      }

      await PostModel.likePost(postId, username);
      const liked = await PostModel.findPostById(postId);
      // return postLiked and message: "Post liked"
      return {
        ...liked,
        message: "Post liked",
      };
    },
  },
};
