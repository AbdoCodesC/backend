import express, { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateSomeUser,
  updateWholeUser,
} from "../controllers/users.controller.js";
import { query, checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.js";
import { resolveUserIndex } from "../middleware/userIndex.middleware.js";

const router = Router();
router.use(express.json());

router.get(
  "/",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be 3-10 chars"),
  getUsers
);

router.get("/:id", resolveUserIndex, getUser);

router.post("/", checkSchema(createUserValidationSchema), createUser);

// only update some things w/out changing the whole data
router.patch("/:id", resolveUserIndex, updateSomeUser);

// update the whole thing
router.put("/:id", resolveUserIndex, updateWholeUser);

router.delete("/:id", resolveUserIndex, deleteUser);

export default router;
