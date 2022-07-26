const express = require("express");
const router = express.Router();
const passport = require('passport');
const userController = require("../controller/userController")


router.get("/",userController.getAll)
router.get('/me', userController.me);
router.post("/add",userController.add)
router.post('/login', passport.authenticate('local'), userController.login);
router.post('/logout', userController.logout);
router.put("/update/:id",userController.update)

module.exports = router