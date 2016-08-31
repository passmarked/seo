You are using multiple canonical links to specify the preferred version of this web page. That is great for SEO. Thing is, you cannot have more than one preferred version.  It doesn't make sense:

```
<head>
	<link rel="canonical" href="http://domain.com/the-preferred-page.html"/>
	<!-- Remove the following superfluous links -->
	<link rel="canonical" href="http://domain.com/actually-this-is.html"/>
	<link rel="canonical" href="http://domain.com/and-this-one.html"/>
</head>
```

# How do I fix this ?

Decide on which canonical link you really want for this page and remove all others. There may be only one.

# Resources

* [Wikipedia](https://en.wikipedia.org/wiki/Canonical_link_element)
* [Matt Cutts](https://www.mattcutts.com/blog/canonical-link-tag/)