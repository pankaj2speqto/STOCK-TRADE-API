const express = require('express');
const router = express.Router()
const stockController=require("../controllers/stock.controller");
const validation=require("../validation/stock.validation")
const validate=require("../middlewares/validate")


router.post("/create",validate(validation.create),stockController.createStockeTrade)
router.get("/data",stockController.findalldata)
router.get("/query",stockController.findStockByquery)
router.get("/trades/:stockId",stockController.findstockById)
router.put("/trades/:stockId",stockController.updateStock)
router.delete("/trades/:stockId",stockController.deleteStock)


module.exports = router;    