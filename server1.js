var express=require('express');
var routes=require('routes');
var http=require('http');
var url=require('url');
var path=require('path');
var bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var mysql=require('mysql');
app.set('port',process.env.port || 4302);
app.set('views',path.join(__dirname,'zxcv'));
app.set('view engine','ejs');
app.get("/",function(req,res){
  res.render("index");
});
app.get("/cart",function(req,res){
  res.render("cart");
});
app.get("/inventory",function(req,res){
  res.render("inventory")
})
var con=mysql.createConnection({host:'localhost',user:'root',password:'',database:'project'});
app.post('/signup',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  var sql="insert into  login(username,password) values('"+username+"','"+password+"')";
  con.query(sql,function(err,result){
    console.log("inserted");
  });
});
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

http.createServer(app).listen(app.get('port'),function(){
  console.log('express server is listening on port'+app.get('port'));
});
