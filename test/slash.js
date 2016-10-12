// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/slash');

// handle the settings
describe('slash', function() {

  // handle the error output
  it('Should not return a error if run on the homepage (/)', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com/',
      testingStatusCode:  200,
      testingRequestUrl:  'http://example.com'

    }, null, '')

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if run on the homepage (/?query=1)', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com/?query=1',
      testingStatusCode:  200,
      testingRequestUrl:  'http://example.com'

    }, null, '')

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the trailling alias of /about (/about/) returns something other than 200', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com/about',
      testingStatusCode:    302,
      testingRequestUrl:    'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.b.html').toString()

    }, null, fs.readFileSync('./samples/slash.a.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the trailling alias of /about (/about/) returns a 200', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com/about',
      testingStatusCode:    200,
      testingRequestUrl:    'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.c.html').toString()

    }, null, fs.readFileSync('./samples/slash.a.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the trailling alias of /about (/about/) returns a 200 with diff', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com/about',
      testingStatusCode:    200,
      testingRequestUrl:    'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.b.html').toString()

    }, null, fs.readFileSync('./samples/slash.a.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the trailling alias of /about (/about/) returns a 200 with the same content', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com/about',
      testingStatusCode:    200,
      testingRequestUrl:    'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.c.html').toString()

    }, null, fs.readFileSync('./samples/slash.a.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the trailling alias of /about/ (/about) returns something other than 200', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com/about/',
      testingStatusCode:  302,
      testingRequestUrl:  'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.b.html').toString()

    }, null, fs.readFileSync('./samples/slash.a.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the trailling alias of /about/ (/about) returns a 200 with diff content', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com/about/',
      testingStatusCode:  200,
      testingRequestUrl:  'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.a.html').toString()

    }, null, fs.readFileSync('./samples/slash.b.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the trailling alias of /about/ (/about) returns a 200 with the same content', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com/about/',
      testingStatusCode:  200,
      testingRequestUrl:  'http://example.com',
      testingRequestBody:   fs.readFileSync('./samples/slash.a.html').toString()

    }, null, fs.readFileSync('./samples/slash.c.html').toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'slash';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

});