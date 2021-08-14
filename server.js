const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'))
// console.log(process.env)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    //    console.log(con.connections);
    console.log('db connection successful!');
  });

// const testTour = new Tour({
//   name: 'The Park Camper',
// rating: 4.7,
//   price: 497,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR:', err);
//   });
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//Test
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
// console.log(x);
