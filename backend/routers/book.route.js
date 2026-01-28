const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");


router.post("/", bookController.store);        
router.get("/", bookController.index);          
router.get("/:id", bookController.show);        
router.patch("/:id", bookController.update);   
router.delete("/:id", bookController.destroy); 

module.exports = router;
