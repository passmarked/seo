// load in the required modules
const url           = require('url');
const S             = require('string');
const async         = require('async');
const request       = require('request');
const _             = require('underscore');
const VARIATIONS    = [

  '/',
  '/index.php',
  '/home.php',
  '/default.php',
  '/index.html',
  '/home.html',
  '/default.html',
  '/index.aspx',
  '/home.aspx',
  '/default.aspx'

];

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
  payload.doRequest({

    url:      options.url,
    type:     'GET',
    session:  data.session

  }, fn);

};

// expose the items
module.exports = exports = function(payload, fn) {

  // start tracking
  payload.start('homepage');

  // params to send back
  var data      = payload.getData();

  // parse the current url
  var uri       = url.parse(data.url);

  // get a cleaned pathname
  var pathname = S(uri.path || '').trim().toLowerCase().s;

  // right check if this is the homepage
  if(VARIATIONS.indexOf( pathname ) === -1) {

    // debugging
    payload.debug('homepage', 'Skipping as ' + uri.pathname + ' != /')

    // end tracking
    payload.end('homepage');

    // finish strong
    return fn(null);
    
  }

  // loop in async and do a HEAD request to them all
  // checking if any one of them returns a 200 which
  // would indicate that the page is serving
  async.each(VARIATIONS, function(variation, cb) {

    // check if it does not match the current page
    if(variation === pathname) {

      // debugging
      payload.debug('homepage', 'Skipping as ' + variation + ' matches the current page - ' + pathname);

      // done
      return cb(null);

    }

    // create the current variation url to check
    var href = url.format( _.extend({}, uri, {

      path:       variation,
      pathname:   variation,
      query:      null

    }) );

    // do the request
    doRequest(payload, {

      url:      href

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

          message:      '$ should be redirected to $ or return a status other than $',
          identifiers:  [ href, url.format(uri), 200 ],
          display:      'url',
          url:          href

        });

      }

      // done
      setImmediate(cb, null);

    });

  }, function() {

    // end tracking
    payload.end('homepage');

    // done
    setImmediate(fn, null);

  });

};
