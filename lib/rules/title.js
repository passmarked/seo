// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')
const _       = require('underscore')

// expose the items
module.exports = exports = function(payload, fn) {

  // start tracking
  payload.start('title');

  // get the url
  var data = payload.getData();

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err)

      // end tracking
      payload.end('title');

      // done
      return fn(null)

    }

    // should not be empty
    if(S(content).isEmpty() === true) {

      // debug
      payload.warning('Content was blank skipping');

      // end tracking
      payload.end('title');

      // done
      return fn(null);

    }

    // load up cheerio
    var $ = cheerio.load(content);

    // get the count of tags
    var headCount = $('head > title').length || 0;

    // check for title tags
    if(headCount === 0) {

      // no titles defined ...
      payload.addRule({

        type:         'error',
        key:          'title.missing',
        message:      'No document <title> tag was found in the head of the page'

      }, {

        display:      'url',
        message:      'Missing title tag on $',
        idenfitiers:  [ data.url ]

      })

      // finish
      return fn(null);

    }

    // keep track of the last line
    var lastLine = -1;

    // the list of known titles
    var knownTitleElements = [];

    // parse the lines
    var lines = content.split('\n');

    // loop all the title tags in the head
    $('head > title').each(function(index, elem) {

      // local reference
      var parentTag   = ((($(elem).parent() || {})['0'] || {}).name || '').toLowerCase();
      var value       = $(elem).text();

      // build the code
      var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

        return line.toLowerCase().indexOf('<title') != -1;

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
          key:      'title.multiple',
          message:  'Multiple document <title> tags were found on the page'

        }, {

          display:  'code',
          code:     build,
          message:  '<title>' + S(value).trim().s + '</title>'

        });

      }

      // check if under head
      if(parentTag != 'head') {

        // add the line
        payload.addRule({

          type:     'error',
          key:      'title.location',
          message:  'Document <title> must be in the <head> section'

        }, {

          display:  'code',
          code:     build,
          message:  '<title>' + S(value).trim().s + '</title>'

        });

      }

      // check if empty
      if(S(value || '').trim().isEmpty() === true) {

        // the build must be defined
        if(!build) return;

        // add a error ...
        payload.addRule({

          type:     'error',
          key:      'title.empty',
          message:  'Document <title> was empty'

        }, {

          display:  'code',
          code:     build,
          message:  'Empty title on line #' + build.subject

        });

      } else if(S(value || '').trim().s.length > 70) {

        // add a error ...
        payload.addRule({

          type:     'warning',
          key:      'title.length',
          message:  'Document <title> will be truncated'

        }, {

          display:  'code',
          code:     build,
          message:  '<title>' + S(value).trim().s + '</title>'

        });

      }

    });

    // end tracking
    payload.end('title');

    // done ... ?
    fn(null)

  });

};