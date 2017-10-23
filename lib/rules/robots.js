// load in the required modules
const cheerio       = require('cheerio')
const url           = require('url')
const S             = require('string')
const async         = require('async')
const request       = require('request')
const robotsParser  = require('robots-parser')
const _             = require('underscore')

// constant bots
var KNOWNROBOTS = require('../../robots.json');

// returns the robots txt based on the payload
var getRobotsTxtContent = function(payload, fn) {

  // get the data
  var data      = payload.getData();

  // parse the url
  var uri       = url.parse(data.url);

  // update with params we need
  uri.pathname  = '/robots.txt';
  uri.search    = '';

  // is robots defined ... ?
  if(data.testingRobots) return fn(null, data.testingRobots);

  // do the actual request
  payload.doRequest({

    url:      url.format(uri),
    session:  data.session

  }, function(err, response, body) {

    // check for a error
    if(err) {

      // output
      payload.error('Problem downloading the website robots.txt', err);

      // return error
      return fn(null, '');

    }

    // check if the response is 200
    if((response || {}).statusCode !== 200) {

      // debug
      payload.debug('The response code from the robots.txt given was ' + ((response || {}).statusCode || 200));

      // nope out of there
      return fn(null, '');

    }

    // done
    fn(null, body || '');

  })

};

// expose the items
module.exports = exports = function(payload, fn) {

  // start tracking
  payload.start('robots');

  // get the data
  var data = payload.getData()

  // go get the robots file
  var uri = url.parse(data.url);

  // get the robots from site
  getRobotsTxtContent(payload, function(err, robotsTxt) {

    // check for a error
    if(err) {

      // output to log
      payload.error('Problem checking the robots txt', err);

      // finish
      return fn(null);

    }

    // is robots not empty
    if(S(robotsTxt).isEmpty() === true) {

      // done
      return fn(null);

    }

    // get the lines
    var lines = (robotsTxt || '').split('\n');

    // handle the txt
    var robots = robotsParser(url.format(_.extend(uri, {

      pathname: '/robots.txt',
      search:   ''

    })), robotsTxt || '');

    // list of bots that cannot access the website
    var bots = [];

    // right so loop all of the bots
    async.each(KNOWNROBOTS || [], function(robot, cb) {

      // check if any of the agents match
      for(var i = 0; i < ((robot || {}).agents || []).length; i++) {

        // check it
        if(robots.isAllowed(data.url, robot.agents[i]) === false) {

          // add the robot
          bots.push(robot);

          // done
          break;

        }

      }

      // done
      cb(null);

    }, function(err) {

      // check if all of the bots failed ...
      if(bots.length == KNOWNROBOTS.length) {

        // set max limit of lines
        var outputLines = (lines || []).slice(0, 100);

        // loop all of them
        for(var i = 0; i < KNOWNROBOTS.length; i++) {

          // add the rule
          payload.addRule({

            type:     'error',
            key:      'robots',
            message:  'Page is blocked for any search indexing according to robots.txt'

          }, {

            message:      '$ blocked by robots.txt',
            identifiers:  [ KNOWNROBOTS[i].name ],
            code:         {

              text:     outputLines,
              start:    0,
              end:      outputLines.length + 1,
              subject:  0

            }

          })

        }

      } else {

        // add each then ...
        for(var i = 0; i < bots.length; i++) {

          // set max limit of lines
          var outputLines = (lines || []).slice(0, 100);

          // add them in
          payload.addRule({

            type:       'error',
            key:        'robots.' + bots[i].key,
            message:    'Page is blocked for any search indexing by ' + bots[i].name

          }, {

            message:      '$ blocked indexing by robots.txt',
            identifiers:  [ bots[i].name ],
            code:         {

              text:       outputLines,
              start:      0,
              end:        outputLines.length + 1,
              subject:    0

            }

          })

        }

      }

      // end tracking
      payload.end('robots');

      // done
      fn(null);

    });

  });

};
