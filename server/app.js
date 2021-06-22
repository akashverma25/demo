require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const models = require('./models');
const moviesRouter = require('./routes/movies');

const app = express();

console.log(process.env.PG_URI);
app.use(cors());
app.use(express.json());//application/json
app.use(express.urlencoded({ extended: false }));//application/x-www-form-urlencoded
app.use(cookieParser());

app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: '404 error'
  });
});


app.listen(4000, () => {
  console.log(`Server is running!`);
})