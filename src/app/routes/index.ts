import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./category";
import productRoutes from "./product";
import variantRoutes from "./variantRoutes";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/variants",
    route: variantRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
