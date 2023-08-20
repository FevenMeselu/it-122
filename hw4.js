import { Car } from "./models/Car.js";
import React from 'react';
import ReactDom from 'react-dom/client';
import express from 'express';
import { getAll, getItem } from './data.js';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api', cors());

app.get('/', (req, res, next) => {
  Car.find({}).lean()
    .then((cars) => {
      res.render('home-react', { cars: JSON.stringify(cars) })
    })
    .catch(err => next(err));
});

app.get('/cars/:model', (req, res, next) => {
  Car.findOne({ "model": req.params.model }).lean()
    .then((car) => {
      res.render('detail', { car });
    })
    .catch(err => next(err));

});
app.get('/carsdetail', (req,res,next) => {
    Cae.findOne({ title:req.query.title }).lean()
        .then((car) => {
            res.render('details', {result: car, model: req.query.model} );
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's
app.get('/api/v1/car/:model', (req, res, next) => {
    let title = req.params.title;
    Car.findOne({model: model}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/cars', (req,res, next) => {
    Car.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    Car.deleteOne({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result});
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let car = new Car(req.body);
        book.save((err,newCar) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newCar._id});
        });
    } else { // update existing document
        Car.updateOne({ _id: req.body._id}, {model:req.body.model, make: req.body.make, pubdate: req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/v1/add/:model/:author/:pubdate', (req,res, next) => {
    // find & update existing item, or add new 
    let model = req.params.model;
    Book.update({ model: model}, {model:model, make: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});