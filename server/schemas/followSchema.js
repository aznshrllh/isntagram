import FollowModel from "../models/followModel.js";

export const typeDefs = `#graphql
  type Follow {
    _id: ID
    followerId: ID
    followingId: ID
  }
  type User {
    _id: ID
    name: String
    username: String
    email: String
    followers: [User]
    following: [User]
  }
    type Query {
    getFollowers(userId: ID!): [User]
    getFollowing(userId: ID!): [User]
  }
  input FollowInput {
    followerId: ID
    followingId: ID
  }
  type Mutation {
    followUser(newFollow: FollowInput): Follow
    #deleteFollow(id: ID!): Follow
  }
`;

export const resolvers = {
  Query: {
    getFollowers: async (_, args) => {
      const { userId } = args;
      return await FollowModel.getFollowers(userId);
    },
    getFollowing: async (_, args) => {
      const { userId } = args;
      return await FollowModel.getFollowing(userId);
    },
  },

  Mutation: {
    followUser: async (_, args, contextValue) => {
      const { newFollow } = args;
      const user = await contextValue.authN();

      if (user._id.toString() === newFollow.followingId) {
        throw new Error("Users cannot follow themselves");
      }

      newFollow.followerId = user._id.toString();

      if (await FollowModel.isFollowing(newFollow)) {
        // unfollow user
        const unfollowResult = await FollowModel.unfollow(newFollow);
        return unfollowResult;
      }

      return await FollowModel.follow(newFollow);
    },
  },
};
