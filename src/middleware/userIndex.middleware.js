import { users } from "../utils/users.js";

// middleware for user index
export const resolveUserIndex = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const userIndex = users.findIndex((user) => user.id === +id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  req.userIndex = userIndex;
  next();
};
