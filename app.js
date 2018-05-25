var express = require('express');
var sm = require('sitemap');
var logger = require('morgan');
var db = require('./db');
var Posturls = db.getPosturls();

var app = express();
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(logger('dev'));


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

for(i=0;i<Posturls.length;i++){
  sitemap.urls.push({ url: Posturls[i],  changefreq: 'monthly',  priority: 0.7 },);
}

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

var routes = require('./routes')(app);



app.listen(port,function(err){
  if(!err){
    console.log('Server running at: '+port);
  }
})
