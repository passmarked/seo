Search engine indexing is being blocked with a meta tag containing a ```noindex``` value in the ```content``` attribute. Non-indexed pages do not show up in search engine result pages. This prevents users from easily accessing the page and its content.  

```
<html>
<head>
 <meta name="robots" content="noindex">
 <title>Don't index this page</title>
</head>
```

<!-- The following heading is enforced by the interpreter -->
# How do I fix this ?

Remove the ```noindex``` value from the ```content``` attribute to allow search engines to index your page.

# Resources

* [Block search indexing with meta tags](https://support.google.com/webmasters/answer/93710?hl=en)
* [About the Robots <Meta> tag](http://www.robotstxt.org/meta.html)
