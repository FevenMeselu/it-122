import { Car } from "./models/Car.js";
import React from 'react';
import ReactDom from 'react-dom/client';
import express from 'express';
import { getAll, getItem } from './data.js';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('pubic'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api', cors());

app.get('/', (req, res) => {
  Car.find({}).lean()
    .then((cars) => {
      res.render('home-react', { cars: JSON.stringify(cars) })
    })
    .catch(err => next(err));
});

app.get('/', (req, res) => {
  console.log(req.url)
  Car.find({}).lean()
    .then((cars) => {
      res.render('home', { cars })
    })
    .catch(err => next(err));
});

app.get('/cars/:model', (req, res) => {
  Car.findOne({ "model": req.params.model }).lean()
    .then((car) => {
      res.render('detail', { car });
    })
    .catch(err => next(err));

});

app.get('/about', (req, res) => {
  console.log(req.url)
  res.send('This class is about making great web sites');
});


//get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get a single car by model
app.get('/api/car/:model', async (req, res) => {
  try {
    const car = await Car.findOne({ "model": req.params.model });
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json(car);
    }
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });
  }
});

// add or update a car
app.post('/api/car', async (req, res) => {
  try {
    const { id, name, make, model, year } = req.body;
    if (model) {
      // update existing car

      const updatedCar = await Car.findByModelAndUpdate(model, { id, name, make, model, year }, { new: true });
      res.json(updatedCar);
    } else {
      // add new Car

      const newCar = new Car({ id, name, make, model, year });
      const savedCar = await newCar.save();
      res.json(savedCar);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete an Car by id

app.delete('/api/car/:model', async (req, res) => {
  try {
    const car = await Car.deleteOne({ "model": req.params.model });
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json({ message: 'Car deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// define 404 handler
app.use((req, res) => {
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});

