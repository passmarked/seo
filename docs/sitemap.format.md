Sitemaps (although not that widely used anymore but still an valid standard) allow site owners to give search engines lists of urls that might be hard to find while doing a normal crawl of the website.

These sitemaps must be a XML file on the root of the site, namely `/sitemap.xml`. Common mistakes around these files involve websites that do not have these files added and return either a full page or content other than XML.

These urls are expected to return either `application/xml` or `text/xml`, anything else indicates that the server is not handling the request correct and/or the file is simply not present and the server is falling back to a full page load. This leads to wasted server time, although minimal.

# How do I fix this ?

Ensure that the sitemap listed at `/sitemap.xml` that is returning a 200, is either defined or updated to return a code other than 200 to show that the file is not present.

The request is expected to be returned as either `application/xml` or `text/xml`.

# Resources

* [Sitemaps XML format](http://www.sitemaps.org/protocol.html)