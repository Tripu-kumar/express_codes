var express = require("express");
var router = express.Router();
var studata=[]
router.get("/studentlist",function(req,res){
    res.render("students",{
        allstudents:studata})
    })
router.get("/studentreg",function(req,res){
    res.sendFile(__dirname+"/studentreg.html")
    })
router.post("/sturegister",function(req,res){
        studata.push(req.body)
        res.send("REGISTRATION SUCCESSFULL")
    })
router.get("/studetails/:x",function(req,res){
        var stu = studata.find((e,i)=>{
           if (e.phone===Number(req.params.x)){
               return true
           }
           else{
               return false
           }
        })
        res.render("studetails",{stulist:stu})})
module.exports = router