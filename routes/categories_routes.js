const router = require("express").Router();
const createCategory = require("../controllers/categories_controller").createCategory;
const getCategory = require("../controllers/categories_controller").getCategory;

router.post("/", createCategory);
router.get("/", getCategory);

module.exports = router;