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
      payload.warning('Content was blank, skipping ...');

      // done
      return fn(null);

    }

    // load up cheerio
    var $ = cheerio.load(content);

    // parse the lines
    var lines = content.split('\n');

    // loop all the title tags in the head
    $('body *').each(function(index, elem) {

      // done

    });

    // loop all the title tags in the head
    $('section,article').each(function(index, elem) {

      // done

    });

    // done ... ?
    fn(null)

  });

};