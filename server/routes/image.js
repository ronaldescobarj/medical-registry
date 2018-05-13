var express = require('express');
var router = express.Router();
var dbConnection = require("../lib/dbConnection");

function prepareResponse(req) {
    var response = {
        success: false,
        response: []
    };
    return response;
}

router.get('/get', function (req, res) {
    var analysisId = req.query.analysisId;
    var queryString = 'SELECT * FROM medical_history.image WHERE analysis_id=' + analysisId;
    var response = prepareResponse(req);  
    dbConnection.pool.connect(function (error, connection, done) {
        if (error) {
            console.error("error");
        } else {
            var query = connection.query(queryString, function (err, resultObj) {
                done();
                if (err) {
                    console.error(JSON.stringify(err));
                } else {
                    var rows = resultObj.rows;
                    response.success = true;
                    response.response = rows;
                    res.json(response);
                }
            });
        }
    });
    
  });

router.post('/add', function(req, res, next) {
    var data = req.body;
    console.log(data);
    response.success = true;
    response.response = {};
    res.send(JSON.stringify(response));
    /* var queryString = "INSERT INTO medical_history.image VALUES (" + data.id + ", '" + data.image + "', '" + data.user_id + ");";    
    var response = prepareResponse(req);
    dbConnection.pool.connect(function (error, connection, done) {
        if (error) {
            console.error("error");
        } else {
            var query = connection.query(queryString, function (err, resultObj) {
                done();
                if (err) {
                    console.error(JSON.stringify(err));
                } else {
                    response.success = true;
                    response.response = {};
                    res.send(JSON.stringify(response));
                }
            });
        }
    });
 */
});

router.post('/delete', function(req, res, next) {
    var data = req.body;
    var queryString = "delete from medical_history.image where id=" + data.id;
    var response = prepareResponse(req);
    dbConnection.pool.connect(function (error, connection, done) {
        if (error) {
            console.error("error");
        } else {
            var query = connection.query(queryString, function (err, resultObj) {
                done();
                if (err) {
                    console.error(JSON.stringify(err));
                } else {
                    response.success = true;
                    response.response = {};
                    res.send(JSON.stringify(response));
                }
            });
        }
    });
});
module.exports = router;
  