# DSU Student Registration System

A complete student registration system with frontend form and Node.js/Express backend with **MongoDB database** for Dayananda Sagar University.

## Features

✓ **Complete Registration Form** with validation:
  - Personal information (name, email, phone, DOB, gender)
  - Educational information (qualification, program of interest)
  - Address details (street, city, state, ZIP, country)
  - Account setup (password with strength validation)
  - Terms & conditions agreement

✓ **Backend REST API** with Express & MongoDB:
  - POST `/api/register` - Register new student
  - GET `/api/registrations` - Get all registrations
  - GET `/api/registrations/:id` - Get specific registration
  - PUT `/api/registrations/:id/status` - Update registration status
  - DELETE `/api/registrations/:id` - Delete registration

✓ **MongoDB Database**:
  - Automatic schema validation
  - Unique email constraint
  - Indexed queries for performance
  - Support for local MongoDB or MongoDB Atlas (cloud)

✓ **Security Features**:
  - Password hashing with bcryptjs
  - Email validation & uniqueness checking
  - Duplicate email prevention at database level
  - Form validation on client & server side
  - Environment variables for sensitive data
  - Secure password storage

## Project Structure

```
ADDIMAGE/
├── index.html           # Main university website
├── register.html        # Registration form page
├── style.css            # Styling for entire site
├── server.js            # Express backend with MongoDB
├── package.json         # Node.js dependencies
├── .env                 # Environment variables (MongoDB URI)
├── MONGODB_SETUP.md     # MongoDB installation guide
└── README.md           # This file
```

## Quick Start

### 1. Setup MongoDB

**Easiest: MongoDB Atlas (Cloud)**
- Visit https://www.mongodb.com/cloud/atlas
- Create free account and cluster (takes 1 min)
- Get connection string
- Update `.env` file with connection string

**Alternative: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and run MongoDB
- Connection: `mongodb://localhost:27017/dsu_registration`

### 2. Install & Run

```bash
cd "c:\Users\harsh\OneDrive\Desktop\ADDIMAGE"
npm install
npm start
```

Server will start on `http://localhost:3000`

### 3. Access Application

- **Registration Form**: http://localhost:3000/register
- **View Registrations (API)**: http://localhost:3000/api/registrations
- **Home Page**: http://localhost:3000

## API Usage

### Register Student
```bash
POST http://localhost:3000/api/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "dob": "2000-01-15",
  "gender": "male",
  "qualification": "12",
  "program": "engineering",
  "address": "123 Main St",
  "city": "Bangalore",
  "state": "Karnataka",
  "zipcode": "560001",
  "country": "India",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "terms": true
}
```

### Get All Registrations
```bash
GET http://localhost:3000/api/registrations
```

### Get Single Registration
```bash
GET http://localhost:3000/api/registrations/:id
```

### Update Registration Status
```bash
PUT http://localhost:3000/api/registrations/:id/status
Content-Type: application/json

{
  "status": "verified"
}
```
Status options: `pending`, `verified`, `approved`, `rejected`

### Delete Registration
```bash
DELETE http://localhost:3000/api/registrations/:id
```

## Environment Setup

Create `.env` file:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsu_registration?retryWrites=true&w=majority

# OR for local MongoDB:
MONGODB_URI=mongodb://localhost:27017/dsu_registration

# Server configuration
PORT=3000
NODE_ENV=development
```

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Security**: bcryptjs (password hashing)
- **Middleware**: CORS, Body-Parser
- **Config**: dotenv

## Form Validation

- **Names**: Required, text only
- **Email**: Required, valid format, unique in database
- **Phone**: Required, min 10 digits
- **DOB**: Required, date format
- **Gender**: Required, dropdown
- **Qualification**: Required, dropdown
- **Program**: Required, dropdown
- **Address**: All required
- **Password**: Required, min 8 characters, must match confirmation
- **Terms**: Must be checked

## MongoDB Schema

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique index),
  phone: String,
  dob: Date,
  gender: String (enum: male, female, other),
  qualification: String,
  program: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  password: String (bcrypt hashed),
  status: String (enum: pending, verified, approved, rejected),
  registeredAt: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check MONGODB_URI in .env
- For Atlas: verify credentials and network access
- For Local: install from https://www.mongodb.com/try/download/community

### Email Already Registered
- Unique index on email field prevents duplicates
- User must use different email or contact admin

### Port 3000 Already in Use
- Change PORT in .env file
- Or: `Get-Process node | Stop-Process`

### Form Not Submitting
- Check browser console (F12) for errors
- Verify server running: `npm start`
- Ensure all required fields filled
- Check MongoDB connection in server logs

## Detailed Setup

For step-by-step MongoDB installation instructions, see **`MONGODB_SETUP.md`** in this directory.

## Security Notes

✓ **Implemented:**
- Password hashing (bcryptjs, 10 rounds)
- Email uniqueness enforcement
- Input validation (client + server)
- No password exposure in API
- Environment variables for secrets

⚠️ **For Production:**
- Use HTTPS/SSL
- Implement JWT authentication
- Add rate limiting
- Enable MongoDB authentication
- Setup monitoring & logging
- Regular security audits
- Use strong credentials

## File Descriptions

| File | Purpose |
|------|---------|
| `register.html` | Student registration form UI |
| `index.html` | Main university website |
| `style.css` | Styling for all pages |
| `server.js` | Express backend with MongoDB |
| `package.json` | Node.js dependencies & scripts |
| `.env` | Environment variables (MongoDB URI, etc) |
| `MONGODB_SETUP.md` | MongoDB installation & setup guide |

## Future Features

- Email verification with OTP
- SMS notifications
- Admin dashboard
- Advanced analytics
- Document uploads
- Payment gateway
- Multi-language support
- Two-factor authentication

---

**Dayananda Sagar University Registration System**  
Version 2.0 | December 2024 | MongoDB Powered
