Your `robots.txt` is blocking Bing from indexing anything on this page. It is rarely a good idea to block a major search engine from crawling your site. Even if you might dislike them, they are only doing you good. 

# How do I fix this ?

Ensure that nothing in the `robots.txt` file blocks `bingbot`.

```
# Blocks the whole site for Bing
User-agent: bingbot
Disallow: /
```

# Resources

* [A list of crawlers used by Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
