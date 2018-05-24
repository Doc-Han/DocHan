var express = require('express');
var sm = require('sitemap');

var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));

var routes = require('./routes')(app);


var sitemap = sm.createSitemap ({
      hostname: 'http://dochan.herokuapp.com',
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: [
        { url: '/',  changefreq: 'daily', priority: 0.5 },
        { url: '/blog',  changefreq: 'weekly',  priority: 0.7 },
        { url: '/post',  changefreq: 'daily',  priority: 0.9 },
        { url: '/contact',  changefreq: 'monthly',  priority: 0.5 },
        { url: '/about',  changefreq: 'monthly',  priority: 0.5 },
        { url: '/work-details',  changefreq: 'daily',  priority: 0.7 },
        //{ url: '/page-4/',   img: "http://urlTest.com" }
      ]
    });

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

app.listen(port,function(err){
  if(!err){
    console.log('Server running at: '+port);
  }
})
