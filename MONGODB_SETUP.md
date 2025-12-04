# MongoDB Setup Guide for DSU Registration System

## Option 1: Use MongoDB Atlas (Cloud) - RECOMMENDED

### Step 1: Create Free Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email/Google/GitHub

### Step 2: Create Cluster
1. Click "Create a Deployment"
2. Select "Free" tier (M0)
3. Choose your region (closest to you)
4. Click "Create Deployment"

### Step 3: Set Up Security
1. Create a database user:
   - Username: `dsu_admin`
   - Password: `create_a_strong_password`
   - Click "Create User"

2. Add connection IP:
   - Click "Add My Current IP Address"
   - Or allow access from anywhere (0.0.0.0/0) - for testing only

### Step 4: Get Connection String
1. Click "Connect"
2. Select "Drivers"
3. Copy the connection string
4. Replace `<password>` with your password

### Step 5: Update .env File
Edit `.env` file in your project:

```
MONGODB_URI=mongodb+srv://dsu_admin:your_password@cluster0.mongodb.net/dsu_registration?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

---

## Option 2: Install MongoDB Locally

### On Windows:

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows and download MSI installer

2. **Install MongoDB**
   - Run the MSI installer
   - Choose "Complete" installation
   - Check "Install MongoDB Compass" (optional but useful)
   - Check "Run MongoDB as a Windows Service"
   - Click "Install"

3. **Verify Installation**
   ```powershell
   mongo --version
   # or
   mongod --version
   ```

4. **Start MongoDB Service**
   ```powershell
   # MongoDB should auto-start as a service
   # Or manually start:
   net start MongoDB
   ```

5. **Update .env File**
   ```
   MONGODB_URI=mongodb://localhost:27017/dsu_registration
   PORT=3000
   NODE_ENV=development
   ```

### On macOS:

```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh --version
```

Then update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/dsu_registration
```

### On Linux (Ubuntu/Debian):

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod

# Verify
mongod --version
```

---

## Testing Your Setup

### Option A: Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Create new database: `dsu_registration`
4. You should see it listed

### Option B: Using Command Line

**For Local MongoDB:**
```bash
mongosh
# In the mongosh shell:
use dsu_registration
db.createCollection("test")
show collections
```

**For MongoDB Atlas:**
```bash
mongosh "mongodb+srv://dsu_admin:password@cluster0.mongodb.net/dsu_registration"
```

---

## Start the Registration System

### 1. Install Dependencies
```bash
cd c:\Users\harsh\OneDrive\Desktop\ADDIMAGE
npm install
```

### 2. Update .env with Your Connection String

### 3. Start the Server
```bash
npm start
```

### 4. Access the Application
- **Registration Form**: http://localhost:3000/register
- **View Registrations**: http://localhost:3000/api/registrations
- **Home Page**: http://localhost:3000

---

## Troubleshooting

### MongoDB Connection Refused
- **Check if MongoDB is running**
  ```bash
  # For Local:
  mongod --version  # Check if installed
  
  # For Service:
  net start MongoDB  # Windows
  sudo systemctl start mongod  # Linux
  ```

### Connection String Error
- Verify `.env` file path and syntax
- Check username/password if using Atlas
- Check firewall settings for local MongoDB

### Database Not Created
- MongoDB automatically creates the database on first write
- Register a student to create the database

### Port Already in Use
- MongoDB default: 27017
- Express app default: 3000
- Change PORT in `.env` if needed

---

## Quick Start with MongoDB Atlas (Easiest)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create cluster (takes 1-2 min)
4. Create user and get connection string
5. Update `.env` file
6. Run `npm install && npm start`

You're done! ✓

---

For more info:
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
