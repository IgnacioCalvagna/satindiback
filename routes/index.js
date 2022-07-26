const express = require("express");
const router = express.Router();


const product = require('./productRoutes')


router.use("/products",product);

module.exports=router


