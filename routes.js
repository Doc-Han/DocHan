module.exports = function(app){

  app.get('/',function(req,res){
    res.render('index');
  })

  app.get('/blog',function(req,res){
    res.render('blog');
  })

  app.get('/works-details',function(req,res){
    res.render('works-details');
  })

  app.get('/contact',function(req,res){
    res.render('contact');
  })

  app.get('/post',function(req,res){
    res.render('post');
  })

  app.get('/about',function(req,res){
    res.render('about');
  })
}
