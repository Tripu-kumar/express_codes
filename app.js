var express= require("express")
var app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'pug');
app.set('views','./views');
var data=[]
var studentrouter=require("./student.routes")
var employeerouter=require("./emp.routes")
app.use("/student",studentrouter)
app.use("/employee",employeerouter)
app.get("/",function(req,res){res.sendFile(__dirname+"/homepage.html")})
app.get("/reg",function(req,res){res.sendFile(__dirname+"/registration.html")})

app.post("/register",function(req,res){
    data.push(req.body)
    res.render("students",{
        allstudents:data})
    })
app.get("//",function(req,res){
    data.push(req.query)
    res.render("students",{
        allstudents:data})
    })
app.get("/register",function(req,res){
        data.push(req.query)
        res.send(JSON.stringify(data))
    })

app.listen(8090,function(){console.log("listening on 8090")})