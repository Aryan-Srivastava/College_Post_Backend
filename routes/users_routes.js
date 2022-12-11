const router = require("express").Router();
const updateUser = require("../controllers/users-controller").updateUser;
const deleteUser = require("../controllers/users-controller").deleteUser;
const getUser = require("../controllers/users-controller").getUser;

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

module.exports = router;
