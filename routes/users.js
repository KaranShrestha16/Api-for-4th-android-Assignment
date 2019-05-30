 const express= require('express');
const routes=express.Router();
const bodyParser= require('body-parser');
const knex =require('knex');
const config =require('../knexfile');
const dbClient= knex(config); 
const cors=require('cors')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');


routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(cors.apply());


//get all user detials 
routes.get('/users', function(req, res){
    const token = req.headers.authorization;

    dbClient.select().from('users')
            .then(function(users){
                res.send(users)
            })
});

// insert user detials 
routes.post('/users/register', function (req, res) {
    const userName = req.body.userName;
    const password=req.body.password;
    //hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);
    dbClient('users').insert({
        userFname: req.body.userFname,
        userLname: req.body.userLname,
        userName: userName,
        password: hashedPassword        
    }).then(data=>{
        res.status(200).json({
            success: true,
           status: 'Registration Successful!'
        })
    }).catch (error =>{
        console.log(error, 'error')
        Response.json({
            success: false, 
            status: 'Registration Fail!'
        })
    })

});


// DELETE  user detials
routes.delete('/users/:id', function (req, res) {
    res.send({ type: 'delete' })
});

// check user
routes.post('/users/login', function (req, res) {
    const passwordFromClient = req.body.password;
    const userName =req.body.userName;
    dbClient.table('users')
             . first('password')
        .where('userName',userName)
             .then(data=>{
                 if(!data){
                     res.status(404).json({
                         success: false,
                         status: 'User not found!'

                     })
                 }else{
                    const passwordFromDB=data.password;
                    const isMatchPassword=bcrypt.compareSync(passwordFromClient,passwordFromDB);
                    if(isMatchPassword){
                        res.status(200).json({
                            success:true,
                            accessToken:jwt.sign({
                                userName:userName},"secret_key")                  
                        })
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'Password do not match'
                        })
                    }

                 }
             }).catch(error => {
                 console.log(error,'error')
                 response.json({
                     success: false,
                     status: 'Login Fail!'
                 })
             })

});


module.exports = routes;

