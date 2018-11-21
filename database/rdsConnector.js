const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const { rds } = require('../config/keys');

//Connect to Amazon RDS

const rdsConn = mysql.createConnection({
  host: rds.host,
  user: rds.username,
  password: rds.password,
  port: rds.port,
  Promise: bluebird
});
//.then(() => console.log('RDS connected'))
//.catch(err => console.log('Unable to connect to RDS', err));

module.exports = rdsConn;
