var express = require('express');
var router = express.Router();

//Import API's
var registersList = require('./registers');
var consultation = require('./consultation');
//Use API's

router.use("/registers", registersList);
router.use('/consultation', consultation);
module.exports = router;