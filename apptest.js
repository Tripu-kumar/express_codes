var express = require("express")
var app = express()
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
app.use(express.urlencoded({extended:true}))
app.use(express.json())
var cors = require('cors')
app.use(cors())
var path = require("path");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
        console.log("file in filename function::",file)
        var fileext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileext)
    }
})
const upload = multer({ storage: storage })
app.use(express.static(__dirname+"/uploads"))
app.get("/stu",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('students').find().toArray(function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/addstudent",upload.single("profilepic"),function(req,res){
    console.log("req.file",req.file);    
    req.body.profilePic = req.file.filename;
    console.log("req.body",req.body);
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('students').insertOne(req.body,function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/addlogin",function(req,res){
    console.log("req.body",req.body);
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('users2').insertOne(req.body,function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/login",function(req,res){
    console.log(req.body)
    MongoClient.connect(url,function(err,con){
    var db = con.db("merit")
    db.collection('users2').find({username:req.body.username}).toArray(function(err,data){
            if(data.length!== 0){
                if(req.body.pwd==data[0].pwd){
                    res.send("login successfull")}
                else{
                    res.send("password does not match")
                } 
            }  
            else{
                res.send("usernotfound")
            }

        })
    })
})
app.listen(8060,function(){console.log("listening on 8060")})