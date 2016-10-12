msnbot is blocked by your `robots.txt` file. It spiders and indexes for Bing - the Microsoft search engine.


# How do I fix this ?

Ensure that nothing in the `robots.txt` file blocks msnbot.

```
# Blocks the whole site for msnbot
User-agent: msnbot
Disallow: /
```

# Resources

* [A list of crawlers used by Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)