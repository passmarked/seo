// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/description');

// handle the settings
describe('description', function() {

  // handle the error output
  it('should report a error if there is no description', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.none.html').toString();

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

        return item.key == 'description.missing';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no description was given for the page');

      // done
      done();

    });

  });

  // handle the error output
  it('should report a error if there is a empty description', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.empty.html').toString();

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

        return item.key == 'description.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no description was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there is a empty description after trim', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.emptyspace.html').toString();

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

        return item.key == 'description.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no description was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there are multiple <description> tags', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.multiple.html').toString();

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

        return item.key == 'description.multiple';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should have given a error because the description was too long');

      // there must be two ...
      if(rule.occurrences.length != 2)
        assert.fail('was expecting two occurrences of descriptions');

      // must not be on the same line ...
      if(rule.occurrences[0].code.subject == rule.occurrences[1].code.subject)
        assert.fail('Must not be on the same line ...');

      // done
      done();

    });

  });

  // handle the error output
  it('should report a warning if the description tag is longer or equal to 160 chars', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.length.html');

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

        return item.key == 'description.length';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should have given a error because the description was too long');

      // done
      done();

    });

  });

  // handle the error output
  it('should not give a error on valid description page', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.clean.html').toString();

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
  it('should give a error if the description meta tag is not in <head>', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.location.html').toString();

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

        return item.key == 'description.location';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('should not give a error if the description meta tag is in <head>, even if not closed by "/>"', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/description.dirty.html').toString();

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

        return item.key == 'description.location';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

});