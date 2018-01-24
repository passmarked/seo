// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')
const _       = require('underscore')

// expose the items
module.exports = exports = function(payload, fn) {

  // start tracking
  payload.start('anchor');

  // get the url
  var data = payload.getData();

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err)

      // end tracking
      payload.end('anchor');

      // done
      return fn(null)

    }

    // should not be empty
    if(S(content).isEmpty() === true) {

      // debug
      payload.warning('Content was blank skipping');

      // end tracking
      payload.end('anchor');

      // done
      return fn(null);

    }

    // load up cheerio
    var $ = cheerio.load(content);

    // keep track of the last line
    var lastLine = -1;

    // parse the lines
    var lines = content.split('\n');

    // loop all the title tags in the head
    $('body a').each(function(index, elem) {

      // local reference
      var value       = $(elem).attr('href');

      // check if it's defined
      if(value !== null || 
          value !== undefined) 
            return;

      // build the code
      var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

        return line.toLowerCase().indexOf('<a') != -1 &&
                line.toLowerCase().indexOf('href') == -1;

      });

      // must find the build
      if(!build) return;

      // set to subject
      lastLine = build.subject;

      // add a error ...
      payload.addRule({

        type:     'error',
        key:      'anchor.href',
        message:  'Missing anchor href detected which will not allow search engines like Google to find pages'

      }, {

        display:  'code',
        code:     build,
        message:  'Empty href on line #' + build.subject

      });

    });

    // end tracking
    payload.end('anchor');

    // done ... ?
    fn(null)

  });

};