import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import database from "../config/mongoDB.js";
import validateEmail from "../helpers/validateEmail.js";
import { ObjectId } from "mongodb";
import { generateToken } from "../helpers/jwt.js";

export default class UserModel {
  static collection() {
    return database.collection("users");
  }

  static async create(newUser) {
    //validate existing user
    const existingUser = await this.findUserByEmail(newUser.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    //validate email
    validateEmail(newUser.email);

    //validate no password
    if (!newUser.password) {
      throw new Error("Password is required");
    }
    //validate password length
    if (newUser.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    //hash password
    newUser.password = await hashPassword(newUser.password);

    //insert user
    const result = await this.collection().insertOne(newUser);
    if (result.insertedCount === 0) {
      throw new Error("User not created");
    }

    return await this.collection().findOne({ _id: result.insertedId });
  }

  static async findUserByEmail(email) {
    return await this.collection().findOne({ email });
  }

  static async findUserByUsername(username) {
    return await this.collection().findOne({ username });
  }

  static async findUserById(id) {
    const userId = new ObjectId(id);
    const user = await this.collection()
      .aggregate([
        { $match: { _id: userId } },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            as: "following",
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following.followingId",
            foreignField: "_id",
            as: "followingUsers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followers.followerId",
            foreignField: "_id",
            as: "followerUsers",
          },
        },
        {
          $addFields: {
            following: "$followingUsers",
            followers: "$followerUsers",
          },
        },
        // { $project: { followingUsers: 0, followerUsers: 0 } },
      ])
      .toArray();

    if (!user.length) {
      throw new Error("User not found");
    }

    return user[0];
  }

  static async getUsers() {
    return await this.collection().find().toArray();
  }

  static async searchUser(search) {
    const regex = new RegExp(search, "i");
    return await this.collection()
      .find({
        $or: [
          { name: { $regex: regex } },
          { username: { $regex: regex } },
          { email: { $regex: regex } },
        ],
      })
      .toArray();
  }

  static async login(login) {
    try {
      const user = await this.findUserByEmail(login.email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordMatch = await comparePassword(
        login.password,
        user.password
      );
      if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
      }

      const accessToken = generateToken({ userId: user._id });
      user.accessToken = accessToken;

      return {
        accessToken,
        userId: user._id,
        username: user.username,
      };
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }
}
