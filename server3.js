const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dependency/db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { createServer } = require('node:http');

const { Server } = require('socket.io');


const app = express();
const port = 3001;
const server = createServer(app);
const io = new Server(server);

// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key'; // Ensure to set this in your environment

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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 3600000 // 1 hour
  }
}));

io.on('connection', (socket) => {
  console.log('a user connected hehe'); //sends to client
  const msg = "guys may nag connect";
  io.emit('chika', msg);

  socket.on('chat message 2', (msg) => { //receives from client
    console.log('message: ' + msg);
  });
});


// Routes
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

});

app.post('/signup', (req, res) => {
  const { name, address, birthday, graduationyear, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal server error');
    }

    const sql = 'INSERT INTO alumni (name, address, birthday, graduationyear, email, password) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, address, birthday, graduationyear, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT password, alumniid FROM alumni WHERE email = ? and STATUS = "active"';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }

    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const hashedPassword = result[0].password;
    const userId = result[0].alumniid;
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).send('Internal server error');
      }

      if (isMatch) {
        console.log("LOGGED IN");
        const token = jwt.sign({ userId }, SECRET_KEY, {
          expiresIn: '1h'
        });
        res.send({ token });
      } else {
        res.status(401).send({ message: 'Invalid password' });
      }
    });
  });
});

app.get('/protected', (req, res) => {
  console.log('Request Headers:', req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error('No Authorization header');
    return res.status(401).send({ message: 'Unauthorized' });
  }

  console.log("Auth Header", authHeader);
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('No token found');
    return res.status(401).send({ message: 'Unauthorized' });
  }

  console.log('Token:', token); // Log the token to ensure it's valid

  jwt.verify(token, SECRET_KEY, { expiresIn: '1h' }, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('Token has expired:', err);
        return res.status(401).send({ message: 'Token has expired' });
      } else {
        console.error('Token verification failed:', err);
        return res.status(401).send({ message: 'Unauthorized' });
      }
    }
    console.log('Token verified successfully:', decoded);
    res.send({ message: 'Welcome to the protected route!' });
  });
});


app.get('/', (req, res) => {
  res.send("Hello");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
