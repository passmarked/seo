// load in the required modules
const url           = require('url');
const S             = require('string');
const request       = require('request');
const async         = require('async');
const _             = require('underscore');
const tld           = require('tldjs');
const diff          = require('diff');

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

    }, data.testingRequestBody || '');

  // check if we are not running 2 versions of the same page
  request.head(options, fn);

};

// expose the items
module.exports = exports = function(payload, fn) {

  // params to send back
  var data          = payload.getData();

  // parse the current url
  var uri           = url.parse(data.url);

  // skip if this is the homepage ...
  if((uri.pathname || '') === '/') {

    // debugging
    payload.debug(data.url + ' was skipped from checking slashes as this was the homepage of the site ...');

    // done
    return fn(null);

  }

  // by default assume it did not end with a slash
  var endingPadding = '/';

  // depending if the url ended with a slash we switch
  if(S(uri.pathname || '').endsWith('/')) {

    // switch to '' ending
    endingPadding = '';

  }

  // create the href
  var href = url.format( _.extend({}, uri, {

    path:       null,
    pathname:   uri.pathname + endingPadding

  }) );

  // get the body
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err)

      // done
      return fn(null)

    }

    // should not be empty
    if(S(content).isEmpty() === true) {

      // debug
      payload.warning('Content was blank skipping');

      // done
      return fn(null);

    }

    // do the check
    doRequest(payload, {

      url:      href,
      timeout:  5 * 1000,
      type:     'HEAD',
      method:   'HEAD'

    }, function(err, response, responseBody) {

      // get the status code
      var statuscode = (response || {}).statusCode;

      // if the response was >= 200 && < 300
      // this is a error :(
      if(statuscode >= 200 && 
          statuscode < 300) {

        // get the diff
        var lines = diff.diffSentences(content || '',responseBody || '');

        // count the diff
        var count = 0;

        // loop the diff
        for(var i = 0; i < (lines || []).length; i++) {

          // check the count
          if( (lines[i] || {}).added == true || 
                (lines[i] || {}).removed == true ) {

            // add to count
            count++;

            // stop loop
            break;

          }

        }

        // check if there is a difference
        if(count === 0) {

          // this is baaaaad, register the rule
          payload.addRule({

            type:         'notice',
            message:      'Avoid duplicate content on trailing slashes',
            key:          'slash'

          }, {

            message:      '$ should be redirected to $, assuming $ was the preferred target',
            identifiers:  [ href, url.format(uri), url.format(uri) ],
            display:      'url',
            url:          href

          });

        }

      }

      // done
      fn(null);

    });

  });

};
