const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');

const app = express();

// db config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
   .connect(db, { useNewUrlParser: true })
   .then(() => console.log('MongoDB connected!'))
   .catch(err => console.log(err));

app.get('/', (req, res) => {
   res.send('Herrrro!')
});

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server running on port ${port}.`)
});
