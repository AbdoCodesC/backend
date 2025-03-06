import express, { Router } from "express";
import { getProducts } from "../controllers/products.controllers.js";

const router = Router();
router.use(express.json());
router.get("/", getProducts);

export default router;
