Sitemaps (although not that widely used anymore but still an valid standard) allow site owners to give search engines lists of urls that might be hard to find while doing a normal crawl of the website.

These sitemaps must be a XML file on the root of the site, namely `/sitemap.xml`.

The sitemap returned by the website was empty, nada, nothing ... After parsing the file no structure could be found, this indicates a empty file. Meaning any search engines trying to parse the file will not find any urls and might even mark the sitemap parsing as a failure.

# How do I fix this ?

Look at defining at least the bare minimum for some structure in the file, while you're at it go ahead and add some urls too.

Basic structures of sitemaps as are:

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>http://www.example.com/</loc>
   </url>
   <url>
      <loc>http://www.example.com/about</loc>
   </url>
</urlset> 
```

# Resources

* [Sitemaps XML format](http://www.sitemaps.org/protocol.html)