import { products } from "../utils/products.js";

export const getProducts = (req, res) => {
  res.send(products);
};
