Yahoo is blocked by your `robots.txt` file meaning that Yahoo cannot index your page.


# How do I fix this ?

Ensure that nothing in the `robots.txt` file blocks Slurp.
Slurp is the name or user-agent of the Yahoo bot.

```
# Blocks the whole site for Yahoo
User-agent: Slurp
Disallow: /
```

# Resources

* [Info about Slurp the Yahoo bot](https://help.yahoo.com/kb/search/SLN22600.html)