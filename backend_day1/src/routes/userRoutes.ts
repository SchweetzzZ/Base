import { Elysia } from "elysia";
import { registerUser, loginUser } from "../controllers/userControler";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRoutes = (app: Elysia) => {
  return app
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/me", async (context: any) => {
      const authResult = await authMiddleware(context);
      if (authResult) return authResult;

      return { user: context.user };
    });
};