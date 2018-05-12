var express = require('express');
var router = express.Router();

//Import API's
var registersList = require('./registers');
var consultation = require('./consultation');
var analysis = require('./analysis');
var selfObservation = require('./selfObservation');
//Use API's

router.use("/registers", registersList);
router.use('/consultation', consultation);
router.use('/analysis', analysis);
router.use('/selfObservation', selfObservation);
module.exports = router;