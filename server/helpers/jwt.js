//importing jwt use module
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token) => {
  try {
    // console.log(token, "<<<token");
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
