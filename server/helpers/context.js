import { checkAuth } from "./auth.js";

export const context = async ({ req }) => {
  const authentication = async () => {
    try {
      return checkAuth(req);
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    authN: () => authentication(),
  };
};
