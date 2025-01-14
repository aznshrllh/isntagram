import { checkAuth } from "./auth.js";

export const context = async ({ req, res }) => {
  try {
    const authorization = req.headers.authorization;
    const operationName = req.body?.operationName;

    if (operationName === "login" || operationName === "register") {
      return {
        message: "No authentication required for register or login",
        user: null,
      };
    }

    if (!authorization) {
      return {
        message: "No authentication required for this request",
        user: null,
      };
    }

    const user = await checkAuth(authorization);

    return {
      user,
    };
  } catch (error) {
    console.error("context error:", error.message);
    throw new Error(error.message);
  }
};
