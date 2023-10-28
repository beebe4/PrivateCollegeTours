const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

app.use(session({
  secret: 'mySuperSecretKey',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
  },
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9r46#u@fb4K',
  database: 'bookings',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});



// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO serviceproviderprofile (username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Registration successful
      return res.status(200).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('Error hashing the password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Query the database to check if the user exists
  const query = 'SELECT * FROM serviceproviderprofile WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if a user with the provided username exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Check if the provided password matches the stored password
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Set the session variable for the authenticated user
        req.session.username = user.username;
        console.log('login user:', username);

        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Get user profile data
app.get('/profile-data', (req, res) => {
  const { username } = req.query;

  const query = 'SELECT * FROM ServiceProviderProfile WHERE Username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Return the profile data as JSON
    res.status(200).json(results[0]); // Assuming the query returns only one row
  });
});

// Update user profile data
app.put('/update-profile', (req, res) => {
  const updatedUserData = req.body; // Data from the request body

  // Perform the update operation in the database
  const query = 'UPDATE ServiceProviderProfile SET ? WHERE Username = ?';
  db.query(query, [updatedUserData, updatedUserData.username], (err, results) => {
    if (err) {
      console.error('Error updating profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if the update was successful
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Send a success response
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

app.get('/serviceproviderprofile', (req, res) => {
  const query = 'SELECT firstName, lastName, Description, img, JobTitle FROM serviceproviderprofile';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(result);
  });
});


// Route for changing the user's password
app.post('/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // Query the database to get the user's hashed password
  const getPasswordQuery = 'SELECT password FROM ServiceProviderProfile WHERE username = ?';
  db.query(getPasswordQuery, [username], async (err, results) => {
    if (err) {
      console.error('Error fetching password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;
    console.log('Received request to change password:', username, oldPassword, newPassword);

    // Compare the old password with the stored hashed password
    try {
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
      if (passwordMatch) {
        // Hash the new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const updatePasswordQuery = 'UPDATE ServiceProviderProfile SET password = ? WHERE username = ?';
        db.query(updatePasswordQuery, [newHashedPassword, username], (updateErr) => {
          if (updateErr) {
            console.error('Error updating password:', updateErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Password changed successfully' });
        });
      } else {
        console.log('Password does not match.');

        res.status(401).json({ error: 'Invalid old password' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


// Route for deleting the user's account
app.delete('/delete-account', (req, res) => {
  const { username } = req.body;

  // Delete the user's account in the database
  const deleteAccountQuery = 'DELETE FROM ServiceProviderProfile WHERE username = ?';
  db.query(deleteAccountQuery, [username], (err) => {
    if (err) {
      console.error('Error deleting account:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  });
});




app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});
