const express = require("express");
const contact = require("./routes/contact");

const router = express.Router();

router.use("/contact", contact);

module.exports = router;
