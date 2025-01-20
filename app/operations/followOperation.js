import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($newFollow: FollowInput) {
    followUser(newFollow: $newFollow) {
      _id
      followerId
      followingId
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($userId: ID!) {
    getFollowers(userId: $userId) {
      _id
      email
      name
      username
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowers($userId: ID!) {
    getFollowing(userId: $userId) {
      _id
      email
      name
      username
    }
  }
`;
