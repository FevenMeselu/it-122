'use strict'

import { Car } from "./models/Car.js";
console.log("Hello!")

Car.find({}).lean()
  .then((car) => {
    console.log(car);
  })
  .catch(err => console.log(err));
