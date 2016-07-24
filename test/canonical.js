// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/canonical');

// handle the settings
describe('canonical', function() {

  // handle the error output
  it('should report a error if there is no canonical', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.none.html').toString();

    // handle the payload
    payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'canonical.missing';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no canonical was given for the page');

      // done
      done();

    });

  });

  // handle the error output
  it('should report a error if there is a empty canonical', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.empty.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err)
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'canonical.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no canonical was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there is a empty canonical after trim', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.emptyspace.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err) 
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'canonical.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no canonical was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there are multiple <canonical> tags', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.multiple.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString());

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err) 
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'canonical.multiple';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should have given a error because the canonical was too long');

      // there must be two ...
      if(rule.occurrences.length != 2)
        assert.fail('was expecting two occurrences of canonicals');

      // must not be on the same line ...
      if(rule.occurrences[0].code.subject == rule.occurrences[1].code.subject)
        assert.fail('Must not be on the same line ...');

      // done
      done();

    });

  });

  // handle the error output
  it('should not give a error on valid canonical page', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.clean.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err) 
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules()

      // check if we found it
      if(rules.length > 0)
        assert.fail('Should not have gotten a error ..');

      // done
      done();

    });

  });

  // handle the error output
  it('should give a error if the canonical is not in <head>', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/canonical.location.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'example.com'

    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // check for a error
      if(err) 
        assert.fail('Was not expecting a error');

      // get the rules
      var rules = payload.getRules()

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'canonical.location';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

});