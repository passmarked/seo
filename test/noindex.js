// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/noindex');

// handle the settings
describe('noindex', function() {

  // handle the error output
  it('Should return a error if the noindex option is present with meta[name=googlebot]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'https://example.com'

    }, null, fs.readFileSync('./samples/noindex.googlebot.html').toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'noindex';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the noindex option is present with meta[name=robots]', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'https://example.com'

    }, null, fs.readFileSync('./samples/noindex.robots.html').toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'noindex';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if there is noindex is blank', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'https://example.com'

    }, null, fs.readFileSync('./samples/noindex.empty.html').toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'noindex';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a rule if the page returns anything other than "noindex" on robots tag', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'https://example.com'

    }, null, fs.readFileSync('./samples/noindex.clean.html').toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'noindex';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if there is no noindex', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'https://example.com'

    }, null, fs.readFileSync('./samples/noindex.none.html').toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'noindex';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

});