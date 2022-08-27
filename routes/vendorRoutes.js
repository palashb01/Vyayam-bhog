import { Router } from "express";
import {
  addProduct,
  changeProductAvailability,
  deleteProduct,
  getProductsFromVendor,
  updateProduct,
} from "../controllers/vendorController";

const router = Router();

router.post("/add-product", addProduct);
router.post("/delete-product/:productID", deleteProduct);
router.post("/update-product/:productID", updateProduct);
router.post("/update-product-availability/:productID", changeProductAvailability);
router.get("/fetch-product/:vendorID", getProductsFromVendor);

export default router;
