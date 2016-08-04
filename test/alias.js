// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/alias');

// handle the settings
describe('alias', function() {

  // handle the error output
  it('Should return a error if the alias also works http://example.com/about => https://example.com/about', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'http://example.com/about',
      testingStatusCode:  200,
      testingRequestUrl:  'https://example.com/about'

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

        return item.key == 'alias.duplicate';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the alias is redirected to the same page', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'http://example.com',
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

      // check if we found it
      if(rules.length > 0)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

});