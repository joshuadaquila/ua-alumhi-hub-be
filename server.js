const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dependency/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminRoutes = require('./dependency/adminRoutes');
const fetchEvents = require('./dependency/fetchEvents');
const notifications = require('./dependency/notifications');
const messages = require('./dependency/message');
const users = require('./dependency/users');
const feed = require('./dependency/feed');
const survey = require('./dependency/survey');
const io = require('./dependency/socketio');


const app = express();
const port = 3001;

// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit process with failure
  }
  console.log('Connected to MySQL database!');
});

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your React app
  credentials: true // Allow credentials (session cookie) to be sent
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/signup', (req, res) => {
  
  const { name, address, birthday, graduationyear, email, password } = req.body;

  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal server error');
    }

    const sql = 'INSERT INTO alumni (name, address, birthday, graduationyear, email, datecreated, password) VALUES (?,?,?,?,?,?,?)';
    db.query(sql, [name, address, birthday, graduationyear, email, formattedDate, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
  });
});

app.post('/signin', (req, res) => {
  console.log("LOGGING IN");
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const sql = 'SELECT password, alumniid, name FROM alumni WHERE email =? and STATUS = "active"';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }

    if (result.length === 0) {
      return res.status(401).send({ message: 'User not found' });
    }

    const hashedPassword = result[0].password;
    const userId = result[0].alumniid;
    const name = result[0].name;
    console.log(name);
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).send('Internal server error');
      }

      if (isMatch) {
        const token = jwt.sign({ userId, name }, SECRET_KEY, {
          expiresIn: '24h'
        });
        console.log(token);
        res.send({ token, name });
      } else {
        res.status(401).send({ message: 'Invalid password' });
      }
    });
  });
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    console.log("Token verification failed no auth header");
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token has expired' });
      } else {
        console.log("Token verification , token expired");
        return res.status(401).send({ message: 'Unauthorized' });
      }
    }
    req.userId = decoded.userId;
    req.name = decoded.name
    console.log("user id", decoded.userId);
    next();
  });
}
app.get('/protected', authenticateToken, (req, res) => {
  res.send({ message: 'Welcome to the protected route!' });
});
// admin ROutes
app.use('/admin', adminRoutes);

//events
app.use('', authenticateToken, fetchEvents);

//notifications
app.use('', authenticateToken, notifications);

// message
app.use('', authenticateToken, messages);

// user
app.use('', authenticateToken, users);

// user
app.use('', authenticateToken, feed);
app.use('', authenticateToken, survey);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
io.attach(server);