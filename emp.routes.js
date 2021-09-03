var express = require("express");
var router = express.Router();
var empdata=[]
router.get("/emplist",function(req,res){
    res.render("employees",{
        allemployees:empdata})
    })
router.get("/empreg",function(req,res){
    res.sendFile(__dirname+"/empreg.html")
    })
router.post("/empregister",function(req,res){
        empdata.push(req.body)
        res.send("REGISTRATION SUCCESSFULL")
    })
module.exports = router