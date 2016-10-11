# @passmarked/seo

![NPM](https://img.shields.io/npm/dt/@passmarked/seo.svg) [![Build Status](https://travis-ci.org/passmarked/seo.svg)](https://travis-ci.org/passmarked/seo)

[Passmarked](http://passmarked.com) is a suite of tests that can be run against any page/website to identify issues with parity to most online tools in one package.

The [Terminal Client](http://npmjs.org/package/passmarked) is intended for use by developers to integrate into their workflow/CI servers but also integrate into their own application that might need to test websites and provide realtime feedback.

All of the checks on [Passmarked](http://passmarked.com) can be voted on importance and are [open-sourced](http://github.com/passmarked/suite), to encourage community involvement in fixing and adding new rules. We are building the living Web Standard and love any [contributions](#contributing).

## Synopsis

The rules checked in this module are:

* **ssl** - The page is not using SSL which has been a newer indicator for page rankings on search engines like Google - see [webmasters.googleblog.com/2014/08/https-as-ranking-signal.html](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)
* **title.empty** - The title tag found on the page was empty, after a trim
* **title.length** - The length of the content in the title tag was more than 70
* **title.missing** - No title tags found on the page
* **title.multiple** - Multiple title tags found on page
* **title.location** - Title tag was found, but not in the head of the page
* **description.empty** - The description meta tag found on the page was empty, after a trim
* **description.multiple** - Multiple title tags found on page
* **description.length** - The length of the content in the description meta tag was more than 160
* **description.missing** - No description meta tags found on the page
* **description.location** - Description meta tag was found, but not in the head of the page
* **homepage** - Returned when a common of alias of the homepage is also being served with a 200, which would indicate duplicate content
* **duplicate.protocol** - Both the http:// and https:// versions of the page are presenting content
* **duplicate.protocol.error** - Either the http:// or https:// version of the page returned a status code between 400 and 600
* **duplicate.protocol.http** - Returned when http:// is not configured while running a https:// page.
* **duplicate.protocol.https** - Returned when https:// is not configured while running a http:// page.
* **noindex** - The page has marked "noindex" in either the **robots** or **googlebot** meta option.
* **robots** - The robots file blocked all of the bots configured for this module, see [Robots](#robots) for list of known user agents.
* **robots.facebook** - The bot from Facebook that generates previews has been blocked.
* **robots.google** - The bot from Google that indexes sites to be searched has been blocked.
* **robots.googlefeature** - The bot from Google that indexes sites to be searched for feature phones has been blocked.
* **robots.bing** - The bot from Bing that indexes sites to be searched has been blocked.
* **robots.msnbot** - The bot from Bing that indexes sites to be searched has been blocked.
* **robots.msnbotmedia** - The bot from Bing that indexes images and videos to be searched has been blocked.
* **robots.adidxbot** - The bot that Bing uses to crawl for ad quality purposes.
* **robots.yahoo** - The bot from Yahoo that indexes sites to be searched has been blocked.
* **sitemap.format** - The sitemap.xml returned was not text/xml or application/xml
* **sitemap.invalid** - The returned sitemap.xml could not be parsed as XML
* **sitemap.schema** - The defined schema for sitemap.xml was not valid according to spec
* **sitemap.prolog** - The sitemap has either no prolog or a misconfigured prolog specified

## Robots

The module checks the following user agents for indexing bots:

* Facebook - facebookexternalhit/1.1
* Facebook - Facebot/1.1
* Google - GoogleBot/2.1
* Googlebot Feature Phones - Googlebot-Mobile/2.1
* Bing - bingbot/2.0
* MSNBot - msnbot/2.0b
* MSNBot-Media - msnbot-media/1.1
* AdIdxBot - adidxbot/1.1
* BingPreview - BingPreview/1.0b
* Yahoo! - Yahoo! Slurp

## Running

The rules are checked everytime a url is run through Passmarked or our API. To run using the hosted system head to [passmarked.com](http://passmarked.com) or our [Terminal Client](http://npmjs.org/package/passmarked) use:

```bash
npm install -g passmarked
passmarked --filter=seo example.com
```

The hosted version allows free runs from our homepage and the option to register a site to check in its entirety.
Using the Passmarked npm module (or directly via the API) integrations are also possible to get running reports with all the rules in a matter of seconds.

## Running Locally

All rules can be run locally using our main integration library. This requires installing the package and any dependencies that the code might have such as a specific version of OpenSSL, see [#dependencies](#dependencies)

First ensure `passmarked` is installed:

```bash
npm install passmarked
npm install @passmarked/seo
```

After which the rules will be runnable using promises:

```seo
passmarked.createRunner(
  require('@passmarked/seo'), // this package
  require('@passmarked/ssl'), // to test SSL
  require('@passmarked/network') // to test network performance
).run({
  url: 'http://example.com',
  body: 'body of page here',
  har: {log: {entries: []}}
}).then(function(payload) {
  if (payload.hasRule('secure')) {
    console.log('better check that ...');
  }
  var rules = payload.getRules();
  for (var rule in rules) {
    console.log('*', rules[rule].getMessage());
  }
}).catch(console.error.bind(console));
```

Alternatively, callbacks are also available:

```seo
passmarked.createRunner(
  require('@passmarked/seo'),
  require('@passmarked/ssl'),
  require('@passmarked/network')
).run({
  url: 'http://example.com',
  body: 'body of page here',
  har: {log: {entries: []}}
}, function(err, payload) {
  if (payload.hasRule('secure')) {
    console.log("better check that ...");
  }
  var rules = payload.getRules();
  for (var rule in rules) {
    console.log('*', rules[rule].getMessage());
  }
});
```

## Dependencies

This module does not need any specific external services or packages. This section will be updated if that ever changes with detailed setup steps/links.

## Rules

Rules represent checks that occur in this module, all of these rules have a **UID** which can be used to check for specific rules. For the structure and more details see the [Wiki](https://github.com/passmarked/passmarked/wiki) page on [Rules](https://github.com/passmarked/passmarked/wiki/Create).

> Rules also include a `type` which could be `critical`, `error`, `warning` or `notice` giving a better view on the importance of the rule.

## Contributing

```bash
git clone git@github.com:passmarked/seo.git
npm install
npm test
```

Pull requests have a prerequisite of passing tests. If your contribution is accepted, it will be merged into `develop` (and then `master` after staging tests by the team) which will then be deployed live to [passmarked.com](http://passmarked.com) and on NPM for everyone to download and test.

## About

To learn more visit:

* [Passmarked](http://passmarked.com)
* [Terminal Client](https://www.npmjs.com/package/passmarked)
* [NPM Package](https://www.npmjs.com/package/@passmarked/seo)
* [Slack](http://passmarked.com/chat) - We have a Slack team with all our team and open to anyone using the site to chat and figure out problems. To join head over to [passmarked.com/chat](http://passmarked.com/chat) and request a invite.

## License

Copyright 2016 Passmarked Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
