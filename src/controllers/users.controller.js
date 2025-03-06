import { User } from "../mongoose/schema/user.js";
import { matchedData, validationResult } from "express-validator";

const users = [];

export const getUsers = (req, res) => {
  const {
    query: { filter, value },
  } = req;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.errors });
  }
  if (filter && value) {
    const user = users.filter((user) => user[filter].includes(value));
    console.log(user);
    res.send(user);
  } else res.send(users);
};

export const getUser = (req, res) => {
  const { userIndex } = req;
  const user = users[userIndex];
  if (!user) return res.status(404).json({ message: "User not found" });
  if (req.cookies.name && req.cookies.name === "abdo")
    return res.json({ data: user });
  else
    return res
      .status(401)
      .json({ message: "Unauthorized, you need the correct cookie" });
};

export const createUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ Error: result.errors });
  const data = matchedData(req);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ data: savedUser, message: "user created successfully" });
  } catch (err) {
    res.status(400).json({ Error: `${err}` });
  }
};

export const updateWholeUser = (req, res) => {
  const { body, userIndex } = req;
  const newBody = {
    id: +req.params.id,
    ...body,
  };
  users[userIndex] = newBody;

  res.status(200).json({ data: users, message: "Updated successfully" });
};

export const deleteUser = (req, res) => {
  users.splice(req.userIndex, 1);
  res.status(200).json({ message: "Deleted successfully" });
};

export const updateSomeUser = (req, res) => {
  const { body, userIndex } = req;
  const newBody = {
    id: +req.params.id,
    ...users[userIndex],
    ...body,
  };
  users[userIndex] = newBody;

  res.status(200).json({ data: users, message: "Updated successfully" });
};
