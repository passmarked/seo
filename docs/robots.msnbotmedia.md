msnbot-media is unable to index anything on this page. This bot indexes images and video for the Bing search engine.
Your robots.txt file is causing this.

# How do I fix this ?

Ensure that nothing in the `robots.txt` file blocks msnbot-media.

```
# Blocks the whole site for msnbot-media
User-agent: msnbot-media
Disallow: /
```

# Resources

* [A list of crawlers used by Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)