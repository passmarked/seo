`robots.txt` is blocking AdidxBot from indexing anything on this page. This bot crawls Bing ads for quality control purposes.
This bot seems to be not so important but then again maybe it is if you're running Bing ads. Which is when you will be crawled.

# How do I fix this ?

Ensure that nothing in the `robots.txt` file blocks `adidxbot`.

```
# Blocks the whole site for AdidxBot
User-agent: adidxbot
Disallow: /
```

# Resources

* [A list of crawlers used by Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)