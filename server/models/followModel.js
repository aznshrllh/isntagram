import { ObjectId } from "mongodb";
import database from "../config/mongoDB.js";

export default class FollowModel {
  static collection() {
    return database.collection("follows");
  }

  static async follow(newFollow) {
    try {
      const { followerId, followingId } = newFollow;
      await this.collection().insertOne({
        followerId: new ObjectId(followerId),
        followingId: new ObjectId(followingId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { followerId, followingId };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async unfollow(newFollow) {
    try {
      const { followerId, followingId } = newFollow;
      const result = await this.collection().deleteOne({
        followerId: new ObjectId(followerId.toString()),
        followingId: new ObjectId(followingId.toString()),
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFollowers(userId) {
    try {
      const followers = await this.collection()
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "followerId",
              foreignField: "_id",
              as: "followers",
            },
          },
          {
            $match: {
              followingId: new ObjectId(userId),
            },
          },
          {
            $unwind: "$followers",
          },
          {
            $project: {
              _id: "$followers._id",
              username: "$followers.username",
              name: "$followers.name",
              email: "$followers.email",
            },
          },
        ])
        .toArray();
      return followers;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFollowing(userId) {
    try {
      const following = await this.collection()
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "followingId",
              foreignField: "_id",
              as: "following",
            },
          },
          {
            $match: {
              followerId: new ObjectId(userId),
            },
          },
          {
            $unwind: "$following",
          },
          {
            $project: {
              _id: "$following._id",
              username: "$following.username",
              name: "$following.name",
              email: "$following.email",
            },
          },
        ])
        .toArray();
      return following;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async isFollowing(newFollow) {
    const { followerId, followingId } = newFollow;
    const follow = await this.collection().findOne({
      followerId: new ObjectId(followerId),
      followingId: new ObjectId(followingId),
    });
    return follow;
  }
}
