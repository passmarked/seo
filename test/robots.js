// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/robots');

const ROBOTS        = require('../robots.json');

// handle the settings
describe('robots', function() {

  // add the test for the robot
  it('Should not return a rule if nothing is blocked - blank', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: *'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check if we found it
      if(rules.length > 0)
        assert.fail('Was not expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should not return a rule if nothing is blocked - no allow', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: *'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check if we found it
      if(rules.length > 0)
        assert.fail('Was not expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should not return a rule if nothing is blocked - allow: *', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: *',
        'allow: /'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check if we found it
      if(rules.length > 0)
        assert.fail('Was not expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should present the error if Google Feature Phone [Googlebot-Mobile/2.1]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: Googlebot-Mobile',
        'disallow: /'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'robots.googlefeature';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should present the error if Facebook [Facebot/1.1]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: Facebot',
        'disallow: /'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'robots.facebook';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should present the error if Facebook [facebookexternalhit/1.1]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: facebookexternalhit',
        'disallow: /'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'robots.facebook';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the robot
  it('Should present the error if Google [Googlebot/2.1]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  [

        'user-agent: Googlebot',
        'disallow: /'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'robots.google';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to be returned');

      // done
      done();

    });

  });

  // handle the error output
  it('Should present a error if all the robots are blocked', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingRobots:  fs.readFileSync('./samples/robots/disallow.txt').toString(),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'robots';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to be returned');

      // done
      done();

    });

  });

});