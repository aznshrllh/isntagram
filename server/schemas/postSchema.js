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
  content: String
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
  #getPost(id: ID): Post
  #getPostsByUser(userId: ID): [Post]
  }

  input PostInput {
  content: String
  imgUrl: String
  tags: [String]
  }

  type Mutation {
  createPost(newPost: PostInput): Post
  deletePost(id: ID): Post
  #addCommentToPost(postId: ID, comment: String): Post
  #likePost(postId: ID): Post
  #unlikePost(postId: ID): Post
  }
  `;

export const resolvers = {
  Query: {
    getPosts: async () => {
      return await PostModel.getPosts();
    },
    // getPost: async (_, args) => {
    //   const { id } = args;
    //   return await PostModel.findPostById(id);
    // },
    // getPostsByUser: async (_, args) => {
    //   const { userId } = args;
    //   return await PostModel.findPostsByUser(userId);
    // },
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
      const deletePost = await PostModel.deletePostById(id, userId);
      // return deletePost and message: "Post deleted"
      return {
        ...deletePost,
        message: "Post deleted",
      };
    },

    // addCommentToPost: async (_, args) => {
    //   const { postId, comment } = args;
    //   return await PostModel.addCommentToPost(postId, comment);
    // },
    // likePost: async (_, args) => {
    //   const { postId } = args;
    //   return await PostModel.likePost(postId);
    // },
    // unlikePost: async (_, args) => {
    //   const { postId } = args;
    //   return await PostModel.unlikePost(postId);
    // },
  },
};
