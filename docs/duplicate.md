The same content shouldn't be served on both HTTP and HTTPS. It doesn't make sense and here is why:

If you are serving on HTTPS which is more secure and more search engine friendly, you want users to use it and rather not HTTP. Turning HTTP off and forcing users to HTTPS will be good.

If you *want* to serve on HTTP then you shouldn't have HTTPS as it costs more and is more complicated to setup and maintain. In other words, if you want the insecure option, why go through the effort and costs of having the secure one ?

Following that logic it is probable that you have mistakenly not enforced HTTPS for this page.

A more technical reason for not doing this is that search engines will see it as duplicate content. You get penalised for this in the ranking as it seems like deliberate spam.

# How do I fix this ?

Force the use of your HTTPS server:

```
# Example for nginx
server {
	listen      80;
    server_name example.com;
    return 301 https://example.com$request_uri;
}
```

That will listen on port 80 for HTTP requests and 301 redirect them to HTTPS instead. Your users will now be more secure and love you for it. Good job.

# Resources

* [nginx rewrite rules](http://nginx.org/en/docs/http/converting_rewrite_rules.html)
* [various opinions on serverfault.com](http://serverfault.com/questions/250476/how-to-force-or-redirect-to-ssl-in-nginx)