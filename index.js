var express= require('express');
var app=express();
var bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extented:true
}));

var cats=require('./cats.js')(app);

var Server=app.listen(3000,function(){
    console.log('Server running at whatever');    
});