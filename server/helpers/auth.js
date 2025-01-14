import { verifyToken } from "./jwt.js";
import UserModel from "../models/userModel.js";

export const checkAuth = async (authorization) => {
  if (!authorization) {
    throw new Error("Authorization header is required");
  }

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    throw new Error("Authorization type is invalid");
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findUserById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Authorization failed:" + error.message);
  }
};
