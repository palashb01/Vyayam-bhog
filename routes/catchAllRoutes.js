import { Router } from "express";
import { invalidEndpoint } from "../controllers/catchAllController";

const router = Router();

router.get("*", invalidEndpoint);
router.post("*", invalidEndpoint);

export default router;
