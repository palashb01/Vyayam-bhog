import { Router } from "express";
import {
  getAvailableProducts,
  getProduct,
  getProducts,
  getSortedProducts,
} from "../controllers/productController.js";

const router = Router();

router.get("/fetch-all", getProducts);
router.get("/fetch/:productID", getProduct);
router.get("/available-products", getAvailableProducts);
router.get("/sort-products", getSortedProducts);

export default router;
