const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsu_registration';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    console.log('Make sure MongoDB is running or update MONGODB_URI in .env file');
  });

// Registration Schema
const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'approved', 'rejected'],
    default: 'pending',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create model
const Registration = mongoose.model('Registration', registrationSchema);

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone
function isValidPhone(phone) {
  const phoneRegex = /^[0-9\-\+\s]{10,}$/;
  return phoneRegex.test(phone);
}

// API Route: Register student
app.post('/api/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      qualification,
      program,
      address,
      city,
      state,
      zipcode,
      country,
      password,
      confirmPassword,
      terms,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !qualification || !program || !address || !city || !state || !zipcode || !country || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Validate terms agreement
    if (!terms) {
      return res.status(400).json({ message: 'You must agree to the Terms and Conditions.' });
    }

    // Check if email already exists
    const existingUser = await Registration.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered. Please use a different email or login.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new registration
    const newRegistration = new Registration({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      dob: new Date(dob),
      gender,
      qualification,
      program,
      address,
      city,
      state,
      zipcode,
      country,
      password: hashedPassword,
      status: 'pending',
    });

    // Save to MongoDB
    await newRegistration.save();

    // Return success response (without password)
    const registrationData = newRegistration.toObject();
    delete registrationData.password;

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for confirmation.',
      registration: registrationData,
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// API Route: Get all registrations (for admin)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().select('-password');
    
    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API Route: Get single registration by ID
app.get('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).select('-password');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API Route: Update registration status
app.put('/api/registrations/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'verified', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    res.json({
      success: true,
      message: 'Registration status updated.',
      data: registration,
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API Route: Delete registration
app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully.',
      deletedId: registration._id,
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to serve register.html
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Route to serve index.html (home page)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Registration form: http://localhost:${PORT}/register`);
  console.log(`✓ View registrations: http://localhost:${PORT}/api/registrations`);
});
