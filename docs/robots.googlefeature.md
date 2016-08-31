Page is blocked for any search indexing by `Googlebot Mobile`. This prevents Google from indexing the page and makes it difficult for people to find it via a google search.

The specific user agent is used to crawl sites for feature phones.

# How do I fix this ?

Make sure there is nothing in the ```robots.txt``` file that is disallowing the Googlebot-Mobile bot.

```
User-agent: Googlebot-Mobile
Disallow:
```

# Resources

* [Introducing smartphone Googlebot-Mobile](https://googlewebmastercentral.blogspot.co.za/2011/12/introducing-smartphone-googlebot-mobile.html)
* [Google Crawlers](https://support.google.com/webmasters/answer/1061943?hl=en)
