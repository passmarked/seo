# load in the required modules
cheerio = require('cheerio')
url     = require('url')
S       = require('string')
_       = require('underscore')
request = require('request')
async   = require('async')

# expose the items
module.exports = exports = (payload, fn) ->

  # get the page content
  payload.getPageContent (err, html_content) ->

    # did we get a error ?
    if err?

      # debug
      payload.error('Got a error trying to get the page content', err)

      # done
      return fn(null)

    # load up cheerio
    $ = cheerio.load(html_content)

    # occurences
    noindex_meta_tags = []
    rule_objs = []
    meta_obj = {}

    # parse the lines
    line_strs = html_content.split('\n')

    # check for title tags
    link_tag_objs = $(html_content).find('link')
    canonical_tag_objs = []

    # loop and find our canonical links
    for item_obj in link_tag_objs

      # check if this is a canonical rel
      if S($(item_obj).attr('rel') or '').trim().s.toLowerCase() == 'canonical'

        # done ...
        canonical_tag_objs.push(item_obj)

    if canonical_tag_objs.length > 0

      # keep track of the items
      link_canonical_subjects = []
      redirect_canonical_subjects = []
      error_canonical_subjects = []

      # last indexed line
      last_current_line = -1

      # check each
      checkLinkValid = (item_obj, cb) ->

        # right so get the content
        link_str = $(item_obj).attr('href') or ''

        # check if not empty
        if S(link_str).isEmpty() == true
          return cb(null)

        # build the subject
        subject_obj = {}

        # get the current line
        build_obj = payload.getSnippetManager().build line_strs, last_current_line,  (line_str) ->

          # check it
          if line_str.toLowerCase().indexOf( '<link' ) == -1
            return false

          if line_str.indexOf( 'canonical' ) == -1
            return false

          if line_str.indexOf( link_str ) == -1
            return false

          # yes !
          return true

        # check it
        if build_obj?

          # add to build
          subject_obj.code = build_obj

          # set the last line
          last_current_line = build_obj.subject

          # do the request
          request {

            type: 'HEAD',
            method: 'HEAD',
            url: link_str,
            timeout: 3 * 1000

          }, (err, response, body) ->

            # did we get a response ?
            if err

              # add the rule
              payload.addRule({

                type: 'error',
                key: 'meta.canonical.link',
                message: 'Canonical link does not exist'

              }, _.extend(subject_obj, {

                display: 'code',
                code: build_obj,
                message: link_str

              }))

            else if not err and (response.statusCode >= 400 and response.statusCode <= 600)

              # add the rule
              payload.addRule({

                type: 'error',
                key: 'meta.canonical.error',
                message: 'Canonical link returns a error'

              }, _.extend(subject_obj, {

                display: 'code',
                code: build_obj,
                message: link_str

              }))

            else if not err and (response.statusCode >= 300 and response.statusCode <= 400)

              # add the rule
              payload.addRule({

                type: 'error',
                key: 'meta.canonical.redirect',
                message: 'Canonical link must return a redirect',
                occurences: redirect_canonical_subjects

              }, _.extend(subject_obj, {

                display: 'code',
                code: build_obj,
                message: link_str

              }))

            # done !
            cb(null)

        else
          cb(null)

      # loop each
      async.each canonical_tag_objs, checkLinkValid, (err) ->

        # done ... ?
        fn(null)

    else

      # done ... ?
      fn(null)
