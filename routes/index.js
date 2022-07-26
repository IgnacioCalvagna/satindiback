const express = require("express");
const router = express.Router();


const product = require('./productRoutes')
const user = require('./userRouter')


router.use("/products",product);
router.use("/user",user);




module.exports=router


