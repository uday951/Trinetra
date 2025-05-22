# Trinetra Project

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) (optional, but recommended)
- [OpenVPN](https://openvpn.net/) (for VPN features in backend)
- [MongoDB](https://www.mongodb.com/) (for backend database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repository/trinetra.git
   cd trinetra
   ```

2. **Install backend dependencies**
   ```bash
   cd trinetra-backend
   npm install
   ```
   
   **Backend Dependencies**:
   - Core: express, mongoose, cors, dotenv
   - Security: bcryptjs, jsonwebtoken
   - File Handling: multer, form-data
   - Networking: axios, ws, node-openvpn
   - System Info: systeminformation
   
   **Backend Dev Dependencies**:
   - TypeScript: typescript, ts-node, @types/node
   - Testing: jest, ts-jest, @types/jest
   - Development: nodemon

3. **Install frontend dependencies**
   ```bash
   cd ../trinetra-frontend/trinetra-frontend
   npm install
   ```
   
   **Frontend Dependencies**:
   - Core: react, react-native, expo
   - Navigation: @react-navigation/native, @react-navigation/bottom-tabs
   - UI: @expo/vector-icons, react-native-svg
   - Storage: @react-native-async-storage/async-storage
   - Location: expo-location
   - File System: expo-file-system, expo-document-picker
   - Networking: axios
   
   **Frontend Dev Dependencies**:
   - TypeScript: typescript
   - Linting: eslint, eslint-config-expo

### Environment Setup

1. **Backend environment variables** (create `.env` in trinetra-backend):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/trinetra
   VIRUSTOTAL_API_KEY=your_api_key
   OPENVPN_HOST=localhost
   OPENVPN_PORT=7505
   JWT_SECRET=your_jwt_secret
   ```

2. **Frontend configuration** (update in trinetra-frontend/trinetra-frontend/app.json):
   - Update package name (`com.trinetra.security`)
   - Configure required permissions

### Running the Application

1. **Start the backend server**
   ```bash
   cd trinetra-backend
   npm run dev
   ```

2. **Start the frontend application**
   ```bash
   cd ../trinetra-frontend/trinetra-frontend
   npm start
   ```

### Pushing to Git

1. **Stage your changes**
   ```bash
   git add .
   ```

2. **Commit your changes**
   ```bash
   git commit -m "Your commit message here"
   ```

3. **Push to the remote repository**
   ```bash
   git push origin main
   ```

## Additional Notes
- Replace `your-repository` with the actual repository URL
- Ensure you have the necessary permissions to push to the repository
- For production, configure proper security settings and secrets
- The backend requires MongoDB to be running 