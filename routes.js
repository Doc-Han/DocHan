var db = require('./db');
var post = db.post;
var work = db.work;

module.exports = function(app){
  var date = new Date();
  app.get('/',function(req,res){
    res.render('index',{work: work,date:date});
  });

  app.get('/blog',function(req,res){
    res.render('blog',{post: post});
  });

  app.get('/works-details',function(req,res){
    res.render('works-details',{work: work});
  });

  app.get('/contact',function(req,res){
    res.render('contact');
  });

  app.get('/about',function(req,res){
    res.render('about');
  });

  app.get('/contactfrom.php',function(req,res){
    res.render('/contactfrom.php');
  });

  app.get('/:name',function(req,res,next){
    for(i=0;i<work.length;i++){
      var reftitle = work[i].name.split(" ").join("-");
      if(req.params.name == reftitle){
        //
      }
    }
    /*work.find(function(ref){
      var reftitle = ref.name.split(" ").join("-");
      console.log(req.params.name == reftitle);
      if(req.params.name == reftitle){
        console.log("/*******go here");
          //res.render('works-details',{post: ref});
      }
    });*/
  });

  app.get('/:title',function(req,res,next){
    post.find(function(ref){
      var reftitle = ref.title.split(" ").join("-");
      if(reftitle == req.params.title){
          res.render('post',{post: ref});
      }
    });
    next();
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.end("The page you are looking for could not be found!");
  });




}
