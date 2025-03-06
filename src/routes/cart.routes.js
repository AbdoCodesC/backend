import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ status: "Unauthorized" });
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) cart.push(item);
  else req.session.cart = [item];
  return res.status(201).json({ data: item });
});

router.get("/", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ status: "Unauthorized" });
  const { cart } = req.session;
  res.status(200).json({ data: cart || [] });
});

export default router;
