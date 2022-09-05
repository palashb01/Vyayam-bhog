import { Router } from "express";
import { invalidEndpoint } from "../controllers/catchAllController.js";

const router = Router();

router.get("*", invalidEndpoint);
router.post("*", invalidEndpoint);

export default router;
