
//var mysql = require('mysql');
var pg = require('pg');
var config = require('../../config.js');
var pool = new pg.Pool(config.db);
// var logger = require('./logger');
// var dbManager = require('../manager/dbManager');
// var configManager = require('../manager/configManager');

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error(__filename + '-20-pool.on error - idle client error ' + err.message + ' ' + err.stack);
});

pool.connect(function (error, connection, done) {
    if (error) console.error("Error connecting to DB " + error);
    else {
        var queryString = 'SELECT 1';
        connection.query(queryString, null, function (err, result) {
            if (err) console.error(__filename + "-28-pool.connect- Error connecting to DB:" + error);
            else console.log(__filename + "-29-pool.connect- Successfully connected to DB");
            done(err);
            // dbManager.init();
            // configManager.init();
        });
    }
});
function cleanup(done) {
    console.log(__filename + "-37-cleanup- DB pool closed gracefully");
    pool.end(done());
}
module.exports.pool = pool;
module.exports.cleanup = cleanup;