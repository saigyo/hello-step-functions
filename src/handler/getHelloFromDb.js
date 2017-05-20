'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const Q = require('kew');

module.exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  const requestId = event.pathParameters ? event.pathParameters.requestId : null;

  function getItem() {
    const defer = Q.defer();
    const params = {
      TableName: 'hello',
      Key: {
        "requestId": {
          S: requestId
        }
      }
    };

    dynamo.getItem(params, defer.makeNodeResolver());
    return defer.promise;
  }

  function response(data, statusCode) {
    const response = {
      statusCode: statusCode,
      body: JSON.stringify({
        data: data,
        requestId: requestId,
      }),
    };

    callback(null, response);
  }

  getItem()
      .then(data => response(data.Item, data.Item ? 200 : 404))
      .fail(err => response(err, 500))
}
