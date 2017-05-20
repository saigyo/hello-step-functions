'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const Q = require('kew');
const dateTime = require('node-datetime');

// the following inspired by https://gist.github.com/martimatix/06481e1321ab99bf4a501705235b261f
module.exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  const now = dateTime.create();

  function putItem() {
    const defer = Q.defer();
    const params = {
      TableName: 'hello',
      Item: {
        requestId: context.awsRequestId,
        datetime: now.format('Y-m-d H:M:S'),
        msg: event.msg,
        who: event.who
      }
    };

    dynamo.putItem(params, defer.makeNodeResolver());
    return defer.promise;
  }

  function response(data, err) {
    if (err) {
      callback(new Error(err))
    } else {
      callback(null, "Success.")
    }
  }

  putItem()
      .then(data => response(data, null))
      .fail(err => response(null, err))
}
