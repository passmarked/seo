Leaving the canonical link's ```href``` attribute empty might cause search engines to penalize a website's pages. Having a canonical location set in your ```link``` element for pages with similar or duplicate content would prevent this problem.

The canonical link element on the page needs to inform search engines about the appropriate page to use to define the content of the current page. This is important when the current page might contain content very similar to other pages on your website.


```
<html>
  <head>
    <title>Page with generic possible duplicate content</title>
    <link rel="canonical" href="examplename.com/source_of_the_content.html"/>
  </head>
</html>
```

# How do I fix this ?

The ```href=``` element attribute should not be empty, it should reference a page with the source of the duplicate content. That same page needs to be referred to in the ```<link rel="canonical" ``` element of all the pages that might share this duplicate content.

# Resources

* [The Canonical Link Relation](https://tools.ietf.org/html/rfc6596)
* [Canonical link element](https://en.wikipedia.org/wiki/Canonical_link_element)
* [Duplicate Content](https://en.wikipedia.org/wiki/Duplicate_content)
