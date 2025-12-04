# DSU Student Registration System

A complete student registration system with frontend form and Node.js/Express backend for Dayananda Sagar University.

## Features

✓ **Complete Registration Form** with validation:
  - Personal information (name, email, phone, DOB, gender)
  - Educational information (qualification, program of interest)
  - Address details (street, city, state, ZIP, country)
  - Account setup (password with strength validation)
  - Terms & conditions agreement

✓ **Backend REST API** with Express:
  - POST `/api/register` - Register new student
  - GET `/api/registrations` - Get all registrations
  - GET `/api/registrations/:id` - Get specific registration
  - PUT `/api/registrations/:id/status` - Update registration status
  - DELETE `/api/registrations/:id` - Delete registration

✓ **Security Features**:
  - Password hashing with bcryptjs
  - Email validation
  - Duplicate email checking
  - Form validation on client & server side
  - Secure password storage

✓ **Data Storage**:
  - JSON file-based storage (`registrations.json`)
  - Automatic file creation and management

## Project Structure

```
ADDIMAGE/
├── index.html           # Main university website
├── register.html        # Registration form page
├── style.css            # Styling for entire site
├── server.js            # Express backend server
├── package.json         # Node.js dependencies
├── registrations.json   # Stored registration data
└── ola.js              # Frontend scripts
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd "c:\Users\harsh\OneDrive\Desktop\ADDIMAGE"
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Access the Application

- **Home Page**: http://localhost:3000/
- **Registration Form**: http://localhost:3000/register
- **View All Registrations (API)**: http://localhost:3000/api/registrations

## Usage

### Register a New Student

1. Navigate to http://localhost:3000/register
2. Fill in all required fields (marked with *)
3. Ensure passwords match
4. Accept Terms & Conditions
5. Click "Register"
6. Receive success confirmation

### API Endpoints

#### Register Student
```bash
POST /api/register
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

Response:
```json
{
  "success": true,
  "message": "Registration successful!",
  "registration": {
    "id": "1702000000000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "status": "pending",
    "registeredAt": "2024-12-04T10:30:00.000Z"
  }
}
```

#### Get All Registrations
```bash
GET /api/registrations
```

#### Get Single Registration
```bash
GET /api/registrations/:id
```

#### Update Registration Status
```bash
PUT /api/registrations/:id/status
Content-Type: application/json

{
  "status": "verified"
}
```

Status options: `pending`, `verified`, `approved`, `rejected`

#### Delete Registration
```bash
DELETE /api/registrations/:id
```

## Form Validation Rules

- **First Name & Last Name**: Required, text only
- **Email**: Required, valid email format, must be unique
- **Phone**: Required, minimum 10 digits
- **Date of Birth**: Required, date format
- **Gender**: Required, dropdown selection
- **Qualification**: Required, dropdown selection
- **Program**: Required, dropdown selection
- **Address Fields**: All required, text input
- **Password**: Required, minimum 8 characters
- **Confirm Password**: Must match password field
- **Terms**: Must be checked

## Data Storage

All registrations are stored in `registrations.json`:
- Student information (personal & educational)
- Hashed passwords (never stored in plain text)
- Registration timestamp
- Current status
- Unique registration ID

## Security Notes

⚠️ **For Production Use**:
- Implement proper database (MongoDB, PostgreSQL, MySQL)
- Add JWT authentication
- Use HTTPS/SSL certificates
- Implement rate limiting
- Add CSRF protection
- Use environment variables for sensitive data
- Implement email verification
- Add admin panel with proper authentication
- Log all transactions
- Regular security audits

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Security**: bcryptjs for password hashing
- **Middleware**: CORS, Body-Parser
- **Storage**: JSON file storage
- **HTTP Client**: Fetch API

## Troubleshooting

### Server not starting?
- Ensure Node.js is installed: `node --version`
- Check if port 3000 is available
- Run: `npm install` to ensure all dependencies are installed

### Registration failing?
- Check browser console (F12) for errors
- Ensure server is running: `npm start`
- Verify all required fields are filled
- Check email is not already registered

### View stored registrations?
- Open: http://localhost:3000/api/registrations in browser
- All registered students will be displayed (without passwords)

## Future Enhancements

- Email verification with OTP
- Admin dashboard for managing registrations
- Database integration (MongoDB/PostgreSQL)
- Payment gateway for admission fees
- Document upload system
- SMS notifications
- Advanced analytics & reporting
- Multi-language support
- Two-factor authentication

---

**Created for Dayananda Sagar University**  
Version 1.0.0 | December 2025
