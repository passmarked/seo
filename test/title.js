// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/title');

// handle the settings
describe('title', function() {

  // handle the error output
  it('should report a error if there is no title', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.none.html').toString();

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

        return item.key == 'title.missing';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no title was given for the page');

      // done
      done();

    });

  });

  // handle the error output
  it('should report a error if there is a empty title', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.empty.html').toString();

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

        return item.key == 'title.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no title was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there is a empty title after trim', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.emptyspace.html').toString();

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

        return item.key == 'title.empty';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should report a error if no title was given for the page')

      // done
      done()

    });

  });

  // handle the error output
  it('should report a error if there are multiple <title> tags', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.multiple.html').toString();

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

        return item.key == 'title.multiple';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should have given a error because the title was too long');

      // there must be two ...
      if(rule.occurrences.length != 2)
        assert.fail('was expecting two occurrences of titles');

      // must not be on the same line ...
      if(rule.occurrences[0].code.subject == rule.occurrences[1].code.subject)
        assert.fail('Must not be on the same line ...');

      // done
      done();

    });

  });

  // handle the error output
  it('should report a warning if the title tag is longer or equal to 55 chars', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.length.html');

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

        return item.key == 'title.length';

      });

      // check if we found it
      if(!rule)
        assert.fail('Should have given a error because the title was too long');

      // done
      done();

    });

  });

  // handle the error output
  it('should not give a error on valid title page', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.clean.html').toString();

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
  it('should give a error if the <title> is not in <head>', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/title.location.html').toString();

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

        return item.key == 'title.location';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

});