It's common for browsers to try to prefix domain names with ```www```, and vice versa.

Your site doesn't allow for this, either ```www.yoursite.com``` or ```yoursite.com``` returns a error.

# How do I fix this ?

Contact your DNS provider, or log in to the admin console they provide. Then, add a ```CNAME``` record, for ```www``` to point to your root domain.

# Resources

* [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-host-name-with-digitalocean)
* [Using Alternate Domain Names on AWS CloudFront](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html)
* [Setting up CNAMEs on Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/10/how-can-i-set-up-a-cname-record-for-my-domain)
