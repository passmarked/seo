// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')
const _       = require('underscore')

// expose the items
module.exports = exports = function(payload, fn) {

  // get the url
  var data = payload.getData();

  // check if the url is https
  if(S(data.url || '').trim().s.toLowerCase().indexOf('https://') !== 0) {

    // show the error
    payload.addRule({

      key:        'ssl',
      type:       'notice',
      message:    'HTTPS not enabled'

    });

  }

  // done ... ?
  fn(null)

};