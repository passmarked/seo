Sitemaps (although not that widely used anymore but still an valid standard) allow site owners to give search engines lists of urls that might be hard to find while doing a normal crawl of the website.

These sitemaps must be a XML file on the root of the site, namely `/sitemap.xml` that start with an valid prolog on the first line:

```
<?xml version="1.0" encoding="UTF-8" ?>

..rest of sitemap ..

```

> Ideally with computers, you'd be very explicit with output and much more relaxed with input.

The reason for the prolog (although optional) is that sitemaps with a explicit encoding remove any change of unexpected behaviour that might cause urls to be indexed wrong with unintended characters.

# How do I fix this ?

Ensure that the first line of the XML file:

* Starts with `<?xml`
* Contains the `version="1.0"` attribute
* Contains a `encoding="UTF-8"` attribute (note UTF-8 can be changed to another encoding if required)
* Ends with `?>`

# Resources

* [Sitemaps XML format](http://www.sitemaps.org/protocol.html)
* [What Content-Type value should I send for my XML sitemap?](http://stackoverflow.com/questions/3272534/what-content-type-value-should-i-send-for-my-xml-sitemap)