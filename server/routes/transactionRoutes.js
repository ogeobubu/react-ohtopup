const { Router } = require("express");
const router = Router();

router.post("/");
router.post("/", login);

module.exports = router;
