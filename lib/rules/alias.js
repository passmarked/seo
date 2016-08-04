// load in the required modules
const url           = require('url');
const S             = require('string');
const request       = require('request');
const async         = require('async');
const _             = require('underscore');
const tld           = require('tldjs');

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
  var data          = payload.getData();

  // parse the current url
  var uri           = url.parse(data.url);

  // decide which protocol is the alternate one
  var protocol      = uri.proto
  var port          = uri.port

  // get the root domain
  var nakedDomain   = null;

  // parse the domain and catch any issues
  try {

    // parse
    nakedDomain = tld.getDomain(uri.hostname);

  } catch(err) {

    // output the error
    payload.error('Problem parsing the naked domain from the url ' + data.url + ' with hostname ' + uri.hostname, err);

  }

  // does it match ?
  if(!nakedDomain) return fn(null);

  // must either be www. or match the current root
  if(nakedDomain !== uri.hostname && 
      uri.hostname.indexOf('www.') !== 0)
        return fn(null);

  // the paths to use
  var target        = _.extend({}, uri, {

    host:     'www.' + uri.host,
    path:     '/',
    search:   null

  });

  // according to the domain type
  if(uri.hostname.indexOf('www.' + nakedDomain) === 0) {

    // if this is on www., check the naked domain
    var target        = _.extend({}, uri, {

      host:     nakedDomain,
      path:     '/',
      search:   null

    });

  }

  // check for each protocol 
  async.each([

    'http', 'https'

  ], function(protocol, cb) {

    // skip the protocol that matches our
    // current redirect page url
    if(protocol + ':' == uri.protocol) 
      return cb(null);

    // create the alt
    var alt = url.format(_.extend({}, target, {

      protocol:       protocol + ':'

    }));

    // check if we are not running 2 versions of the same page
    doRequest(payload, {

        type:             'HEAD',
        method:           'HEAD',
        url:              alt,
        timeout:          5 * 1000,
        followRedirect:   true

      }, function(err, response, body) {

        // check that we did not get a error
        if(err) {

          // cleaned protocol
          var proto = S(protocol).trim().s.replace(/\:/gi, '').toLowerCase();

          // add them in
          payload.addRule({

            type:     'notice',
            key:      'alias.connect',
            message:  'Not able to connect to common alias for root of domain'

          }, {

            message:      'Unable to connect to $',
            identifiers:  [ alt ]

          })

        } else if((response || {}).statusCode >= 200 && 
            (response || {}).statusCode <= 300) {

          // must check the redirect url
          if(response.request.uri.hostname != uri.hostname || 
              response.request.uri.path != uri.path || 
                response.request.uri.protocol != uri.protocol) {

            // add them in
            payload.addRule({

              type:     'error',
              key:      'alias.duplicate',
              message:  'Common alias for root domain serving duplicate content'

            }, {

              message:      '$ responded with a status code of $',
              identifiers:  [ alt, 1 * response.statusCode ]

            })

          }

        } else if((response || {}).statusCode >= 400 && 
                    (response || {}).statusCode <= 600) {

          // add them in
          payload.addRule({

            type:         'error',
            key:          'alias.error',
            message:      'Common alias for root of domain returns a error'

          }, {

            message:      '$ responded with a status code of $',
            identifiers:  [ alt, 1 * response.statusCode ]

          })

        }

        // done ... ?
        cb(null);

      });

  }, function() {

    // done
    fn(null);

  });

};
