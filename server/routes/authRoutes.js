const { Router } = require("express");
const { create, login } = require("../controllers/auth");
const router = Router();

router.post("/create", create);
router.post("/login", login);

module.exports = router;
