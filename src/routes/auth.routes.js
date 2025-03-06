import { Router } from "express";
import { users } from "../utils/users.js";

const router = Router();

router.post("/", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password)
    return res.status(401).json({ message: "BAD CREDENTIALS" });

  req.session.user = user;
  return res.status(200).json({ data: user });
});

router.get("/status", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = users.find((user) => user.username === username);
  console.log(req.session.user);
  if (
    user &&
    req.session.user &&
    req.session.user.username === user.username &&
    req.session.user.password === user.password
  )
    return res.status(200).json({ status: "Authorized" });
  else return res.status(401).json({ status: "Unauthorized" });
});

export default router;
