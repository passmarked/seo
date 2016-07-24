// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/ssl');

// handle the settings
describe('ssl', function() {

  // handle the error output
  it('Should not return a error if HTTPS is not being used', function(done) {

    // handle the payload
    payload = passmarked.createPayload({

      url: 'https://example.com'

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

        return item.key == 'ssl';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a error as the page is using HTTPS');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error as we are not using HTTPS', function(done) {

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'

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

        return item.key == 'ssl';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error as we were looking for HTTPS');

      // done
      done();

    });

  });

});