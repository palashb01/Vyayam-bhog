import { Router } from "express";
import {
  getCategories,
  getProductsFromCategories,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/fetch-all", getCategories);
router.get("/fetch-products", getProductsFromCategories);

export default router;
