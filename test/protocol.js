// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/protocol');

// handle the settings
describe('protocol', function() {

  // handle the error output
  it('Should return a problem if the alt version is throwing a 501', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com',
      testingStatusCode:  501,
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

        return item.key == 'duplicate.error';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return if http:// is being served too while accessing with https://', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'https://example.com',
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

        return item.key == 'duplicate';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return if https:// is being served too while accessing with http://', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                'http://example.com',
      testingStatusCode:  200,
      testingRequestUrl:  'https://example.com'

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

        return item.key == 'duplicate';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if we were redirected back to original', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com',
      testingStatusCode:    200,
      testingRequestUrl:    'https://example.com'

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

        return item.key == 'duplicate';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the alias returns a error and we are unable to connect', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'https://example.com',
      testingPresentError:  true

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

        return item.key == 'duplicate.connect';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the alias returns a error and we are unable to connect', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url:                  'http://example.com',
      testingPresentError:  true

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

        return item.key == 'duplicate.connect';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was not was expecting a rule to return');

      // done
      done();

    });

  });

  /*
  for(var index = 200; index < 400; index++) {

    // handle the error output
    it('Should return a duplicate error if the target page returns a ' + index + ' status code', function(done) {

      // handle the payload
      var payload = passmarked.createPayload({

        url:                  'http://example.com',
        testingPresentError:  index

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

          return item.key == 'duplicate.connect';

        });

        // check if we found it
        if(rule)
          assert.fail('Was expecting a rule to return');

        // done
        done();

      });

    });

  }

  for(var index = 400; index < 600; index++) {

    // handle the error output
    it('Should return a duplicate error if the target page returns a ' + index + ' status code', function(done) {

      // handle the payload
      var payload = passmarked.createPayload({

        url:                  'http://example.com',
        testingPresentError:  index

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

          return item.key == 'duplicate.connect.error';

        });

        // check if we found it
        if(rule)
          assert.fail('Was expecting a rule to return');

        // done
        done();

      });

    });

  }
  */

});