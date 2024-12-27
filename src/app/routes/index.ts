import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.routes";
import { BlogRouter } from "../modules/blog/blog.routes";

interface IModuleRouter {
   path: string;
   route: Router;
}

const router = Router();

const moduleRouters: IModuleRouter[] = [
   {
      path: "/auth",
      route: AuthRouter,
   },
   {
      path: "/blogs",
      route: BlogRouter,
   },
];

moduleRouters.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
