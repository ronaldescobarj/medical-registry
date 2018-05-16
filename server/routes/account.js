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

router.get('/authenticate', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var userQueryString = "SELECT * FROM medical_history.account WHERE username='" + username + "';";
    var response = prepareResponse(req);
    dbConnection.pool.connect(function (error, connection, done) {
        if (error) {
            console.error("error");
        } else {
            var userQuery = connection.query(userQueryString, function (err, resultUserObj) {
                done();
                if (err) {
                    console.error(JSON.stringify(err));
                } else {
                    if (resultUserObj.rows.length > 0) {
                        var userAndPasswordQueryString = "SELECT * FROM medical_history.account WHERE username='" + username + "' and password='" + password + "';";

                        response.success = true;
                        response.response = rows;
                    }
                    else {
                        response.message = "username invalid";
                    }
                }
                res.json(response);
            });
        }
    });

});

router.post('/create', function (req, res, next) {
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
                    response.success = true;
                    response.response = {};
                    res.send(JSON.stringify(response));
                }
            });
        }
    });

});

router.post('/update', function (req, res, next) {
    var data = req.body;
    var queryString = generateQuery(data, "update");
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

router.post('/delete', function (req, res, next) {
    var data = req.body;
    var queryString = "delete from medical_history.analysis where id=" + data.id;
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
