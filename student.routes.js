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
module.exports = router