import { Router } from "express";

const router = Router();

// auth test route
router.get("/", (req, res) => {
  res.json({
    message: "Auth Routes",
  });
});

const authRoutes = router;
export default authRoutes;
