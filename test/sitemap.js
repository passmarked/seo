// modules
const assert        = require('assert');
const _             = require('underscore');
const fs            = require('fs');
const passmarked    = require('passmarked');
const testFunc      = require('../lib/rules/sitemap');

// handle the settings
describe('sitemap', function() {

  // add the test for the sitemap
  it('Should not return an error if the /sitemap.xml url returned anything else than a 200', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 404

      },
      testingSitemap:  [

        ' '

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check if we found it
      if(rules.length > 0)
        assert.fail('Was not expecting a rule to be returned');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the sitemap returned as text/html', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/html'

        }

      },
      testingSitemap:  [

        'user-agent: *'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.format';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should not return an error if the sitemap returned as application/xml', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'application/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        'user-agent: *'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.format';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should not return an error if the sitemap returned as text/xml', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        'user-agent: *'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.format';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should not return an error if the prolog is correct - <?xml version="1.0" encoding="UTF-8" ?>', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" encoding="UTF-8" ?>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should not return an error if the prolog is correct, even with spaces - <?xml version="1.0" encoding="UTF-8" ?>', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '        <?xml version="1.0" encoding="UTF-8" ?>     '

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the prolog is missing <?xml at the start', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        'version="1.0" <?xml encoding="UTF-8" ?>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the prolog is missing version="1.0" at the start', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml encoding="UTF-8" ?>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the prolog is missing encoding=', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" ?>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the prolog is missing the end tag - ?>', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" encoding="UTF-8"'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.prolog';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should not return an error if the XML is able to parse', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" encoding="UTF-8" ?>',
        '<urlset>',
        '</urlset>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.invalid';

      });

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the XML is not able to parse', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" encoding="UTF-8" ?>',
        '<urlset>',
        '<urlset>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.invalid';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

  // add the test for the sitemap
  it('Should return an error if the first node is not "urlset"', function(done) {

    // handle the payload
    var payload = passmarked.createPayload({

      testingSitemapResponse: {

        statusCode: 200,
        headers: {

          'content-type': 'text/xml;charset=utf-8'

        }

      },
      testingSitemap:  [

        '<?xml version="1.0" encoding="UTF-8" ?>',
        '<test hello="world">',
        '</test>'

      ].join('\n'),
      url:            'https://example.com'

    }, null, '');

    // run the rules
    testFunc(payload, function(err) {

      // check for an error
      if(err)
        assert.fail('Was not expecting an error');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) {

        return item.key == 'sitemap.schema';

      });

      // check if we found it
      if(!rule)
        assert.fail('Was expecting a rule to return');

      // done
      done();

    });

  });

});