const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();

//connect database
connectDB();

//Init Middleware
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/forum', require('./routes/api/forum'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
