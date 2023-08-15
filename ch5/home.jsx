import React from 'react';
const Home = ({ cars }) => {
  return (
    IT 122 Home page

  Cars!

  {
    cars.map((car) => (
      [{`/cars/${car.model}`}]
  { 
      car.model
    }
))}
); };
export default Home;