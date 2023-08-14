import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://db:Ate0132022@cluster0.z1y2ffn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  dbName: 'it-projects',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carsSchema = new Schema({
  id: Number,
  name: String,
  make: String,
  model: String,
  year: Number
});

export const Car = mongoose.model('Car', carsSchema);

