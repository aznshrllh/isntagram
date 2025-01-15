import { verifyToken } from "./jwt.js";
import UserModel from "../models/userModel.js";

export const checkAuth = async (req) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new Error("Unauthorized");

  const token = accessToken.split(" ")[1];
  // if (type !== "Bearer") throw new Error("Unauthorized Different Type Token");

  const { userId } = verifyToken(token);

  const user = await UserModel.findUserById(userId);

  if (!user) throw new Error("Unauthorized");

  const { password, ...rest } = user;
  return rest;
};
