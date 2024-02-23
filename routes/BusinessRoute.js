import express from "express";
import {
  addBusiness,
  deleteBusiness,
  getBusinesses,
  getBusinessesById,
  searchBusinesses,
  updateBusiness,
} from "../controllers/Business.js";

const router = express.Router();

router.get("/business", getBusinesses);
router.get("/business/search", searchBusinesses);
router.get("/business/:id", getBusinessesById);
router.post("/business", addBusiness);
router.patch("/business/:id", updateBusiness);
router.delete("/business/:id", deleteBusiness);

export default router;
