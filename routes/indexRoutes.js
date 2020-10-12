const express     =       require("express"),
      router      =       express.Router();

const {checkAuth} = require('../config/middlewares');


const indexRoutes = require("../controllers/indexController");


router.get("/",    checkAuth,        indexRoutes.getIndex,)

module.exports = router;