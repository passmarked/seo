Sitemaps (although not that widely used anymore but still an valid standard) allow site owners to give search engines lists of urls that might be hard to find while doing a normal crawl of the website.

These sitemaps must be a XML file on the root of the site, namely `/sitemap.xml` that conform to the standard laid out by [Sitemaps XML format](http://www.sitemaps.org/protocol.html). 

Valid sitemaps would appear as follows (for a example):

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   <url>

      <loc>http://www.example.com/</loc>

      <lastmod>2005-01-01</lastmod>

      <changefreq>monthly</changefreq>

      <priority>0.8</priority>

   </url>

   <url>

      <loc>http://www.example.com/</loc>

      <lastmod>2005-01-01</lastmod>

      <changefreq>monthly</changefreq>

      <priority>0.8</priority>

   </url>

</urlset> 
```

with the following options, that are either required or optional:

* loc (required) - The absolute url for the page that is intended to be crawled
* lastmod (optional) - The last modified date of this url in the format `YYYY-MM-DD`, search engines may or may not use this property as per their own discretion.
* changefreq (optional) - Gives search engines a **hint** as to how frequently this page is updated, possible values include:
** `always` - Indicates document that change everytime they are accessed
** `hourly` - Indicates documents could be changed every hour
** `daily` - Indicates documents could be changed every day
** `weekly` - Indicates documents could be changed every weekly
** `monthly` - Indicates documents could be changed every monthly
** `yearly` - Indicates documents could be changed every yearly
** `never` - Indicates documents that are for archival more than realtime / active data
* priority (optional) - **Hints** at how important a page is to be displayed when showing search results, this property expects a decimal number between 0.0 and 1.0

# How do I fix this ?

Ensure the schema of your page matches the standard as defined at [Sitemaps XML format](http://www.sitemaps.org/protocol.html), fixing any issues listed on a per case basis.

# Resources

* [Sitemaps XML format](http://www.sitemaps.org/protocol.html)
* [What Content-Type value should I send for my XML sitemap?](http://stackoverflow.com/questions/3272534/what-content-type-value-should-i-send-for-my-xml-sitemap)