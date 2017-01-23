// load in the required modules
const cheerio = require('cheerio')
const url     = require('url')
const S       = require('string')
const _       = require('underscore')

// expose the items
module.exports = exports = function(payload, fn) {

  // get the url
  var data = payload.getData();

  // the subject address
  const subjectAddress = {

    key:      'seo',
    rule:     'ssl',
    subject:  S(data.url || '').slugify().s

  };

  // check if the url is https
  if(S(data.url || '').trim().s.toLowerCase().indexOf('https://') !== 0) {

    // check if not checked already for this site
    payload.isMentioned(subjectAddress, function(err, isMentioned) {

      // check for a error
      if(err) {

        // output to log
        payload.error('Problem checking the sitemap txt', err);

        // finish
        return fn(null);

      }

      // is sitemap not empty
      if(isMentioned === true) {

        // done
        return fn(null);

      }

      payload.mention(subjectAddress, function() {

        // show the error
        payload.addRule({

          key:          'ssl',
          type:         'warning',
          message:      'HTTPS not enabled'

        }, {

          display:      'url',
          message:      '$ was served over $',
          identifiers:  [ data.url, 'HTTP' ]

        });

        // done
        fn(null);

      });

    });

  } else {

    // done ... ?
    fn(null)

  }

};