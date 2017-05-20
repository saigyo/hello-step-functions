'use strict';

module.exports.hello = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.fail === true) {
    callback(new Error("I was asked to fail."))
  }
  
  callback(null, "Hello, " + event.who + "!");
};
