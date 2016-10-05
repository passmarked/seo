Sitemaps (although not that widely used anymore but still an valid standard) allow site owners to give search engines lists of urls that might be hard to find while doing a normal crawl of the website.

These sitemaps must be a XML file on the root of the site, namely `/sitemap.xml`. The sitemap listed for the website could not be parsed as valid XML, which could lead to unexpected and even urls not being crawled.

# How do I fix this ?

Ensure that the returned XML file from `/sitemap.xml` contains valid XML that can be used, see [www.xmlvalidation.com/](https://www.xmlvalidation.com/) for an quick tool to test for valid XML.

# Resources

* [Sitemaps XML format](http://www.sitemaps.org/protocol.html)
* [Validate XML](https://www.xmlvalidation.com/)