Your site is using a `robots.txt` file to block all search engines from indexing it entirely.

# How do I fix this ?

Ensure that the `robots.txt` file is not blocking this page using an `*` (asterisk).

```
# Blocks the whole site for all search engines
User-agent: *
Disallow: /

# Blocks all search engines in a specific area
User-agent: *
Disallow: /admin
```

# Caveats

Using `robots.txt` to hide parts of your site is ineffective. In fact, it makes it easier for malware bots.
They may simply download your robots.txt file and purposely access the *hidden* resources as it is public.
There is no way to force bots to obey `robots.txt`.

# Resources

* [All about robots.txt](http://www.robotstxt.org/robotstxt.html)