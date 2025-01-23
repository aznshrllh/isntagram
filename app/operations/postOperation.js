import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation CreatePost($newPost: PostInput) {
    createPost(newPost: $newPost) {
      _id
      authorId
      comments {
        comment
        username
        createdAt
      }
      content
      createdAt
      imgUrl
      likes {
        username
        createdAt
      }
      tags
      updatedAt
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      authorId
      comments {
        username
        comment
        createdAt
      }
      content
      createdAt
      imgUrl
      likes {
        username
        createdAt
      }
      tags
      updatedAt
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPosts($getPostId: ID!) {
    getPost(id: $getPostId) {
      _id
      authorId
      comments {
        comment
        username
        createdAt
      }
      content
      createdAt
      imgUrl
      likes {
        username
        createdAt
      }
      tags
      updatedAt
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query GetPosts($userId: ID!) {
    getPostsByUser(userId: $userId) {
      _id
      authorId
      comments {
        comment
        createdAt
        username
      }
      content
      createdAt
      imgUrl
      likes {
        createdAt
        username
      }
      tags
      updatedAt
    }
  }
`;

export const ADD_COMMENT = gql`
($postId: ID!, $comment: String!) {
  addCommentToPost(postId: $postId, comment: $comment) 
}
`;

export const LIKE_POST = gql`
  mutation AddCommentToPost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      authorId
      comments {
        comment
        createdAt
        username
      }
      content
      createdAt
      imgUrl
      likes {
        createdAt
        username
      }
      tags
      updatedAt
    }
  }
`;
