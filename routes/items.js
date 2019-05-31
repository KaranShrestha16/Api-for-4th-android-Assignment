const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const UserAuthentication = require('../middleware/UserAuthentication')
// connecting to the database 
 const config=require('../knexfile');
 const dbClient=knex(config);

routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(cors.apply());

routes.post('/items',function(req,res){
 
            dbClient('items').insert({
                itemName: req.body.itemName,
                itemPrice: req.body.itemPrice,
                itemImageName: req.body.itemImageName,
                itemDescription: req.body.itemDescription
            }).then(function () {
                dbClient.select().from('items').then(function () {
                    res.status(200).json({
                        sucess:true,
                        message:"Item insert Sucessfully"
                    });
                })
            }).catch(error => {
                console.log(error, 'error')
                res.status(400).json({
                    success: false,
                    status:"Failed to insert data on items"
                })
            })                                                      
        });

routes.get('/items',function(req,res){
        dbClient.select()
        .from('items')
        .then(function(data){
            res.send(data)
        }).catch(error => {
            console.log(error, 'error')
            response.status(400).json({
                success: false,
                status: "Failed to Retrive items"
            })
        })

});

routes.put('/items/:itemId', function (req, res) {
    dbClient('items')
        .where('itemId', req.params.itemId)
        .update({
            itemName: req.body.itemName,
            itemPrice: req.body.itemPrice,
            itemImageName: req.body.itemImageName,
            itemDescription: req.body.itemDescription
        }).then(function () {
            dbClient.select().from('items').then(function () {
                res.status(200).json({
                    sucess: true,
                    message: "Item upDate Sucessfully"
                });
            })
        }).catch(error => {
            console.log(error, 'error')
            response.status(400).json({
                success: false,
                status: "Failed to update data of items"
            })
        })       
});

routes.get('/items/:itemId', function (req, res) {
        dbClient.select()
            .from('items')
            .where('itemId', req.params.itemId)
            .then(function (data) {
                res.send(data)
            }).catch(error => {
                console.log(error, 'error')
                response.status(400).json({
                    success: false,
                    status: "Cannot retrive data of items"
                })
            })
    });

routes.delete('/items/:itemId', function (req, res) {
    dbClient('items').where('itemId', req.params.itemId)
        .del()
        .then(function () {
            res.status(200).json({
                sucess: true,
                message: "Item Delete Sucessfully"
            });
           
        }).catch(error => {
            console.log(error, 'error')
            response.status(400).json({
                success: false,
                status: "Cannot retrive data of items"
            })
        })
});

routes.delete('/items', function (req, res) {
    dbClient('items')
        .del()
        .then(function () {
            res.status(200).json({
                sucess: true,
                message: "All Items Deleted"
            });

        }).catch(error => {
            console.log(error, 'error')
            response.status(400).json({
                success: false,
                status: "Cannot Delete data of items"
            })
        })
});

module.exports = routes;