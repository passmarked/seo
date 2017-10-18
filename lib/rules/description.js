// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')
const _       = require('underscore')

// expose the items
module.exports = exports = function(payload, fn) {

  // get the url
  var data = payload.getData();

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err)

      // done
      return fn(null)

    }

    // should not be empty
    if(S(content).isEmpty() === true) {

      // debug
      payload.warning('Content was blank skipping');

      // done
      return fn(null);

    }

    // load up cheerio
    var $ = cheerio.load(content);

    // get the count of tags
    var headCount = $('meta[name=description]').length || 0;

    // check for title tags
    if(headCount === 0) {

      // no titles defined ...
      payload.addRule({

        type:         'error',
        key:          'description.missing',
        message:      'No document description tag was found in the head of the page'

      }, {

        display:      'url',
        message:      'Missing description meta tag on $',
        idenfitiers:  [ data.url ]

      })

      // finish
      return fn(null);

    }

    // keep track of the last line
    var lastLine = -1;
    var lastHeadLine = -1;

    // the list of known titles
    var knownTitleElements = [];

    // parse the lines
    var lines = content.split('\n');

    // get the body html
    var bodyLines = ($('body').html() || '').split('\n');
    bodyLines = bodyLines.slice(bodyLines.indexOf('</head>'), bodyLines.length);

    // loop all the title tags in the head
    $('body meta[name=description]').each(function(index, elem) {

      // get the value of the meta tag
      var value       = $(elem).attr('content') || '';

      // build the code
      var build = payload.getSnippetManager().build(bodyLines, lastHeadLine, function(line) {

        return line.toLowerCase().indexOf('<meta') != -1 && 
                line.toLowerCase().indexOf('description') != -1;

      });

      // must find the build
      if(!build) return;

      // set to subject
      lastHeadLine = build.subject;

      // add the line
      payload.addRule({

        type:     'error',
        key:      'description.location',
        message:  'Document description must be in the <head> section'

      }, {

        display:  'code',
        code:     build,
        message:  S(value).trim().s

      });

    });

    // loop all the title tags in the head
    $('meta[name=description]').each(function(index, elem) {

      // local reference
      var parentTag   = ((($(elem).parent() || {})['0'] || {}).name || '').toLowerCase();
      var value       = $(elem).attr('content') || '';

      // build the code
      var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

        return line.toLowerCase().indexOf('<meta') != -1 && 
                line.toLowerCase().indexOf('description') != -1;

      });

      // must find the build
      if(!build) return;

      // set to subject
      lastLine = build.subject;

      // check if there are more than 1
      if(headCount > 1) {

        // add the line
        payload.addRule({

          type:     'error',
          key:      'description.multiple',
          message:  'Multiple document descriptions were found on the page'

        }, {

          display:  'code',
          code:     build,
          message:  S(value).trim().s

        });

      }

      // check if empty
      if(S(value || '').trim().isEmpty() === true) {

        // the build must be defined
        if(!build) return;

        // add a error ...
        payload.addRule({

          type:     'error',
          key:      'description.empty',
          message:  'Document description was empty'

        }, {

          display:  'code',
          code:     build,
          message:  'Empty description on line #' + build.subject

        });

      } else if(S(value || '').trim().s.length > 160) {

        // add a error ...
        payload.addRule({

          type:         'warning',
          key:          'description.length',
          message:      'Document description will be truncated'

        }, {

          display:      'code',
          code:         build,
          message:      'Description $, was $ characters long but will be truncated at $ for most search engines',
          identifiers:  [ S(value).trim().s, S(value).trim().s.length, 160 ]

        });

      }

    });

    // done ... ?
    fn(null)

  });

};