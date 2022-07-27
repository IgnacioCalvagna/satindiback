const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/byLinea/:linea", async (req, res, next) => {
  try {
    const { linea } = req.params;
    const porLinea = await Product.findAll({ where: { linea } });
    res.send(porLinea);
  } catch (err) {
    next(err);
  }
});

router.post("/add", (req, res, next) => {
  try {
    Product.create(req.body).then((newProduct) => res.send(newProduct));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
