const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const engineers = require('./routes/api/engineers');
const fms = require('./routes/api/fms');
const pms = require('./routes/api/pms');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/engineers', engineers);
app.use('/api/fms', fms);
app.use('/api/pms', pms);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
