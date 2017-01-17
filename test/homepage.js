// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/homepage');
const variations    = [

  '/',
  '/index.php',
  '/home.php',
  '/default.php',
  '/index.html',
  '/home.html',
  '/default.html',
  '/index.aspx',
  '/home.aspx',
  '/default.aspx'

];

// handle the settings
describe('homepage', function() {

  
  

  // loop and add a test for each
  for(var i = 0; i < variations.length; i++) {

    // handle the error output
    it('Should not report a error if ' + variations[i] + ' returns statuscode < 200 || > 300 while testing /about', function(done) {

      // handle the payload
      var payload = passmarked.createPayload({

        url:                'https://example.com/about',
        testingStatusCode:  302,
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

          return item.key == 'homepage';

        });

        // check if we found it
        if(rule)
          assert.fail('Was was expecting a rule to return');

        // done
        done();

      });

    });

  }

  // loop and add a test for each
  for(var i = 0; i < variations.length; i++) {

    for(var a = 0; a < variations.length; a++) {

      var variationToCheck = variations[i];

      // handle the error output
      it('Should not report a error if ' + variations[a] + ' returns statuscode < 200 || > 300 while testing ' + variations[i], function(done) {

        // handle the payload
        var payload = passmarked.createPayload({

          url:                'https://example.com' + variationToCheck,
          testingStatusCode:  302,
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

            return item.key == 'homepage';

          });

          // check if we found it
          if(rule)
            assert.fail('Was was expecting a rule to return');

          // done
          done();

        });

      });

    }

  }

  // loop and add a test for each
  for(var i = 0; i < variations.length; i++) {

    for(var a = 0; a < variations.length; a++) {

      var variationToCheck = variations[i];

      // handle the error output
      it('Should report a error if ' + variations[a] + ' returns statuscode >= 200 || < 300 while testing ' + variations[i], function(done) {

        // handle the payload
        var payload = passmarked.createPayload({

          url:                'https://example.com' + variationToCheck,
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

            return item.key == 'homepage';

          });

          // check if we found it
          if(!rule)
            assert.fail('Was was expecting a rule to return');

          // done
          done();

        });

      });

    }

  }

});