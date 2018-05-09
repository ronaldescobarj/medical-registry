var express = require('express');
var router = express.Router();
var async = require('async');
var dbConnection = require("../lib/dbConnection");

function prepareResponse(req) {
    var response = {
        success: false,
        response: []
    };
    return response;
}

function addType(arr, type) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].type = type;
    }
    return arr;
}

router.get('/list', function (req, res) {
    var id = req.query.id;
    var response = prepareResponse(req);
    var registers = [];
    dbConnection.pool.connect(function (error, connection, done) {
        if (error) {
            console.error("error");
        } else {
            var queryConsultations = 'SELECT id, summary, date FROM medical_history.consultation';            
            var queryCons = connection.query(queryConsultations, function (err, resultObjCons) {
                if (err) {
                    console.error(JSON.stringify(err));
                } else {
                    registers = resultObjCons.rows;
                    registers = addType(registers, "consultation");
                    var queryAnalysis = 'SELECT id, summary, date FROM medical_history.analysis';
                    var queryAn = connection.query(queryAnalysis, function (err, resultObjAn) {
                        if (err) {
                            console.error(JSON.stringify(err));
                        } else {
                            var analysisList = resultObjAn.rows;
                            console.log("analisis", analysisList);
                            analysisList = addType(analysisList, "analysis");
                            registers = registers.concat(analysisList);
                            var queryObservations = 'SELECT id, summary, date FROM medical_history.self_observation';
                            var queryObs = connection.query(queryObservations, function (err, resultObjObs) {
                                done();
                                if (err) {
                                    console.error(JSON.stringify(err));
                                } else {
                                    var observationsList = resultObjObs.rows;
                                    console.log("observations", observationsList);                                    
                                    observationsList = addType(observationsList, "self_observation");
                                    registers = registers.concat(observationsList);
                                    // console.log(registers);
                                    response.success = true;
                                    response.response = registers;
                                    res.json(response);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
  });
module.exports = router;
  