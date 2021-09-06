var express = require("express")
var app = express()
var data =[]
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'pug');
app.set('views','./views');
var employeerouter = require("./emp.routes")
var studentrouter = require("./student.routes")
app.use("/student",function(req,res,next){
    console.log("request received")
    next()})
app.use(express.static(__dirname+"/open"))
app.get("/",function(req,res){res.sendFile(__dirname+"/homepage.html")})
app.use("/student",studentrouter)
app.use("/employee",employeerouter)
app.get("/logo.jpg",function(req,res){
    res.sendFile(__dirname+"/logo.jpg")
})
app.listen(8090,function(){console.log("listening on 8090")})