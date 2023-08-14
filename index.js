import { Car } from "./models/Car.js";
import express from 'express';
import { getAll, getItem } from './data.js';
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('pubic'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log(req.url)
  Car.find({}).lean()
    .then((cars) => {
      res.render('home', { cars })
    })
    .catch(err => next(err));

});
app.get('/cars/:model', (req, res) => {
  console.log(req.url)
  res.render('detail', { car: getItem(req.params.model) });
});
app.get('/about', (req, res) => {
  console.log(req.url)
  res.send('This class is about making great web sites');
});

// define 404 handler
app.use((req, res) => {
  res.status(404);
  res.send('404 - Not found');
});
app.listen(app.get('port'), () => {
  console.log('Express started');
});

