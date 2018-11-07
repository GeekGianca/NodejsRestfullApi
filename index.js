/**
 * API RESTFULL NODEJS
 * Author: Gian Carlos
 */
var mysql = require('mysql');
var express = require('express');

var body_parser = require('body-parser');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"geekprogramador23",
    database:"nodeexample"
});

var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));

app.get("/", (req, res, next)=>{
    connection.query("SELECT * FROM programming", function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});

app.get("/course/:id", (req, res, next)=>{
    connection.query("SELECT * FROM programming WHERE id = ?",[req.params.id],function(err, result, fields){
        if(err) throw err;
        res.end(JSON.stringify(result));
    });
});
/*
    POST BODY:
    id:
    name:
    time:
*/
app.post("/", (req, res, next)=>{
    var post_data = req.body;
    connection.query("INSERT INTO `programming` SET ?", post_data, function(err, result, fields){
        if(err) throw err;
        res.json("successful");
    });
});
app.put("/", (req, res, next)=>{
    connection.query("UPDATE `programming` SET `name` = ?, `time`=? WHERE id = ?", [req.body.name, req.body.time, req.body.id], function(err, result, fields){
        if(err)
            throw err;
        res.json("Update Success");
    });
});
app.delete("/", (req, res, next)=>{
    connection.query('DELETE FROM `programming` WHERE id = ?', [req.body.id], function(err, result, fields){
        if(err)
            throw err;
        res.json('Delete sucess');
    });
});
//Start WebServer
app.listen(3000, ()=>{
    console.log("Gksoftware Web Service running in port:3000 -> localhost:3000");
});