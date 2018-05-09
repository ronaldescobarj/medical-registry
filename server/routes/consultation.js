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

router.get('/get', function (req, res) {
    var id = req.query.id;
    var queryString = 'SELECT * FROM medical_history.consultation WHERE id=' + id;
    var response = prepareResponse(req);  
    var randomNumber = Math.random();
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
                    console.log(rows);
                    response.success = true;
                    response.response = rows;
                    res.json(response);
                }
                // done();
            });
        }
    });
    
  });
function generateQuery(data, type) {
    var query = "";
    if (type=="insert")
        query = "INSERT INTO medical_history.consultation VALUES (" + data.id + ", '" + data.summary + "', '" + data.doctor + "', '" + data.diagnostic + "', '" + data.hospital + "', '" + data.description + "', '" + data.commentary + "', '" + data.date + "', " + data.user_id + ");";
    if (type=="update")
        query = "UPDATE medical_history.consultation SET summary='" + data.summary + "', doctor='" + data.doctor + "', diagnostic='" + data.diagnostic + "', hospital='" + data.hospital + "', description='" + data.description + "', commentary='" + data.commentary + "', date='" + data.date + "' WHERE id=" + data.id;
    /* for (var property in data) {
        if (data.hasOwnProperty(property)) {
            if (property == "id" || property == "user_id") {
                query += "'" + data[property] + "', ";
            }
        }
    } */
    return query;
}
router.post('/create', function(req, res, next) {
    var data = req.body;
    var queryString = generateQuery(data, "insert");
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
                    // var rows = resultObj.rows;
                    // console.log(rows);
                    response.success = true;
                    response.response = {};
                    res.send(JSON.stringify(response));
                }
                // done();
            });
        }
    });

});

router.post('/update', function(req, res, next) {
    var data = req.body;
    var queryString = generateQuery(data, "update");
    console.log(queryString);
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
                // done();
            });
        }
    });
});

router.post('/delete', function(req, res, next) {
    var data = req.body;
    var queryString = "delete from medical_history.consultation where id=" + data.id;
    console.log(queryString);
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
                // done();
            });
        }
    });
});
module.exports = router;
  