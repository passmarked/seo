// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')

// expose the items
module.exports = exports = function(payload, fn) {

  // start tracking
  payload.start('noindex');

  // get the url
  var data = payload.getData();

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err)

      // end tracking
      payload.end('noindex');

      // done
      return fn(null)

    }

    // should not be empty
    if(S(content || '').isEmpty() === true) return fn(null);

    // load up cheerio
    var $ = cheerio.load(content);

    // last line
    var lastLine = -1;

    // parse the lines
    var lines = content.split('\n');

    // the objects
    var linkCount = ($('head > link[rel=canonical]') || []).length;

    // loop all the title tags in the head
    $('meta[name=robots],meta[name=googlebot]').each(function(index, elem) {

      // local reference
      var value = S($(elem).attr('content') || '').trim().s.toLowerCase().replace(/\s+/gi, '');

      // check the content
      if(value.split(',').indexOf('noindex') == -1) return;

      // check if no canonical links are set
      if(linkCount > 0) return;

      // build the code
      var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

        return line.toLowerCase().indexOf('<meta') != -1 && 
                ( line.toLowerCase().indexOf('googlebot') != -1 || 
                    line.toLowerCase().indexOf('robots') != -1 );

      });

      // must find the build
      if(!build) return;

      // set to subject
      lastLine = build.subject;

      // add the line
      payload.addRule({

        type:         'error',
        key:          'noindex',
        message:      'Search indexing blocked with meta tags'

      }, {

        display:      'code',
        code:         build,
        message:      'Page blocked for indexing with $ meta tag',
        identifiers:  [ 'noindex' ]

      });

    });

    // end tracking
    payload.end('noindex');

    // done
    fn(null);

  });

};
