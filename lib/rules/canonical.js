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
    var headCount = $('link[rel=canonical]').length || 0;

    // check for title tags
    if(headCount === 0) {

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
    $('link[rel=canonical]').each(function(index, elem) {

      // local reference
      var parentTag   = ((($(elem).parent() || {})['0'] || {}).name || '').toLowerCase();
      var value       = $(elem).attr('href') || '';

      // build the code
      var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

        return line.toLowerCase().indexOf('<link') != -1 &&
                line.toLowerCase().indexOf('rel') != -1 && 
                  line.toLowerCase().indexOf('canonical') != -1;

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
          key:      'canonical.multiple',
          message:  'Multiple document canonical links were found on the page'

        }, {

          display:  'code',
          code:     build,
          message:  S(value).trim().s

        });

      }

      // check if under head
      if(parentTag != 'head') {

        // add the line
        payload.addRule({

          type:     'error',
          key:      'canonical.location',
          message:  'Document canonical link must be in the <head> section'

        }, {

          display:  'code',
          code:     build,
          message:  S(value).trim().s

        });

      }

      // check if empty
      if(S(value || '').trim().isEmpty() === true) {

        // add a error ...
        payload.addRule({

          type:     'error',
          key:      'canonical.empty',
          message:  'Document canonical link was empty'

        }, {

          display:  'code',
          code:     build,
          message:  'Empty canonical on line #' + build.subject

        });

      }

    });

    // done ... ?
    fn(null)

  });

};