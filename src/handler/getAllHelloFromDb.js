'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const Q = require('kew');
const tableName = process.env.TABLE_NAME

module.exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  function scanItems() {
    const defer = Q.defer();
    const params = {
      TableName: tableName,
      Limit: 20
    }

    dynamo.scan(params, defer.makeNodeResolver());
    return defer.promise;
  }

  function response(data, statusCode) {
    const response = {
      statusCode: statusCode,
      body: JSON.stringify({
        data: data,
      }),
    };

    callback(null, response);
  }

  scanItems()
      .then(data => response(data.Items, 200))
      .fail(err => response(err, 500))
}
