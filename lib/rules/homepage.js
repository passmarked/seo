// load in the required modules
const url           = require('url');
const S             = require('string');
const async         = require('async');
const request       = require('request');
const _             = require('underscore');
const constants     = require('../constants');

// stub functions that will check for testing data first, 
// before doing a actual request over the network
var doRequest = function(payload, options, fn) {

  // params to send back
  var data      = payload.getData();

  // check if we got testing data
  if(data.testingPresentError)
    return fn(new Error());

  // check if we got testing data
  if(data.testingStatusCode)
    return fn(null, {

      statusCode: 1 * data.testingStatusCode,
      request: {

        uri: url.parse(data.testingRequestUrl)

      }

    }, '');

  // check if we are not running 2 versions of the same page
  request(options, fn);

};

// expose the items
module.exports = exports = function(payload, fn) {

  // params to send back
  var data      = payload.getData();

  // parse the current url
  var uri       = url.parse(data.url);

  // variations we will be checking of the homepage
  const variations = constants.VARIATIONS;

  // get a cleaned pathname
  var pathname = S(uri.path || '').trim().toLowerCase().s;

  // right check if this is the homepage
  if(variations.indexOf( pathname ) === -1) {

    // debugging
    payload.debug('Skipping as ' + uri.pathname + ' != /')

    // finish strong
    return fn(null);
    
  }

  // loop in async and do a HEAD request to them all
  // checking if any one of them returns a 200 which
  // would indicate that the page is serving
  async.each(variations, function(variation, cb) {

    // check if it does not match the current page
    if(variation === pathname) {

      // debugging
      payload.debug('Skipping as ' + variation + ' matches the current page - ' + pathname);

      // done
      return cb(null);

    }

    // create the current variation url to check
    var href = url.format( _.extend({}, uri, {

      path:       variation,
      pathname:   null,
      query:      null

    }) );

    // do the request
    doRequest(payload, {

      url:      href,
      timeout:  5 * 1000

    }, function(err, response) {

      // get the status code
      var statuscode = (response || {}).statusCode;

      // check if we got a 200
      if(statuscode >= 200 && 
          statuscode < 300) {

        // this is baaaaad, register the rule
        payload.addRule({

          type:         'error',
          message:      'Common alias of homepage should not also be serving',
          key:          'homepage'

        }, {

          message:      '$ should be redirect to $',
          identifiers:  [ href, url.format(uri) ],
          display:      'url',
          url:          href

        });

      }

      // done
      cb(null);

    });

  }, function() {

    // done
    fn(null);

  });

};
