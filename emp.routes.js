var express = require("express");
var router = express.Router();
var empdata=[{
    fullname:"tripu",
    phone:"2345",
    address:"frgdh",
    email:"tripu@gmail.com",
    company:"dffghf",
    pass:"asdfs",
    repass:"asdfs"
}]
router.get("/emplist",function(req,res){
    res.render("employees",{
        allemployees:empdata})
    })
router.get("/empreg",function(req,res){
    res.sendFile(__dirname+"/empreg.html")
    })
router.post("/empregister",function(req,res){
        empdata.push(req.body)
        console.log(empdata)
        res.send("REGISTRATION SUCCESSFULL")
    })
router.get("/details/:x",function(req,res)
    {
       var emp=empdata.filter((e,i)=>{
           if (e.phone === req.params.x){
            console.log(req.params.x)   
            return true
           }
           
        })
        console.log(emp)
        res.send(emp)
    })
module.exports = router