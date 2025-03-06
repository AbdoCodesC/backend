import { users } from "../utils/users";

export const auth = (req, res, next) => {
  const {
    body: { username, password },
  } = req;
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password)
    return res.status(401).json({ message: "BAD CREDENTIALS" });

  next();
};
