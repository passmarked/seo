Due to various configs of web servers, the homepage of a site could possibly be accessed using numerous alias. 

For SEO reasons (and to avoid duplicate content) these alias should ideally redirect to the intended homepage or just returrn a error.

It should be noted most search engines like [https://google.com](Google) do handle these edges cases as they see fit but to avoid unexpected behaviour is is recommended to take control to avoid confusion and avoid wasted server load.

# How do I fix this ?

Only one of the following may be considered the "true" homepage and all other alias listed should be redirected to the selected homepage:

* `/`
* `/index.php`
* `/home.php`
* `/default.php`
* `/index.html`
* `/home.html`
* `/default.html`
* `/index.aspx`
* `/home.aspx`
* `/default.aspx`

This will ensure the site is optimised for search engines like [https://google.com](Google) when checking the website.

That will listen on port 80 for HTTP requests and 301 redirect them to HTTPS instead. Your users will now be more secure and love you for it. Good job.

# Resources

* [htaccess remove index.php from url](http://stackoverflow.com/questions/4365129/htaccess-remove-index-php-from-url)
* [nginx rewrite rules](http://nginx.org/en/docs/http/converting_rewrite_rules.html)