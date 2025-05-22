# Trinetra - Mobile Security App

Trinetra is a comprehensive mobile security application that provides real-time protection, monitoring, and optimization features for your device.

## Features

- **Security Scanning**
  - File and URL malware scanning using VirusTotal API
  - Real-time threat detection and alerts
  - Comprehensive security reports

- **VPN Protection**
  - Secure VPN connection management
  - Website blocking and filtering
  - Traffic encryption

- **Device Health**
  - System resource monitoring
  - Performance optimization
  - Battery and temperature tracking
  - Anti-theft features with location tracking

- **App Management**
  - Installation monitoring
  - Resource usage tracking
  - Security status checks
  - Real-time activity monitoring

- **Alert System**
  - Real-time security notifications
  - Customizable alert settings
  - Threat level classification
  - Alert history and statistics

## Project Structure

```
trinetra/
├── trinetra-backend/         # Backend server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   └── server.ts        # Server configuration
│   ├── package.json         # Dependencies
│   └── tsconfig.json        # TypeScript configuration
│
└── trinetra-frontend/       # Frontend application
    ├── src/
    │   ├── screens/         # App screens
    │   ├── components/      # Reusable components
    │   └── services/        # API services
    └── package.json         # Dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenVPN (for VPN features)
- VirusTotal API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trinetra.git
   cd trinetra
   ```

2. Install backend dependencies:
   ```bash
   cd trinetra-backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../trinetra-frontend
   npm install
   ```

4. Create environment variables:
   ```bash
   # In trinetra-backend/.env
   PORT=5000
   VIRUSTOTAL_API_KEY=your_api_key
   OPENVPN_HOST=localhost
   OPENVPN_PORT=7505
   REMOTE_WIPE_CODE=your_secure_code
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd trinetra-backend
   npm run dev
   ```

2. Start the frontend application:
   ```bash
   cd trinetra-frontend
   npm start
   ```

## API Documentation

### Security Endpoints

- `POST /api/security/scan-file` - Scan file for malware
- `POST /api/security/check-url` - Check URL safety
- `GET /api/security/scan-history` - Get scan history

### VPN Endpoints

- `POST /api/vpn/connect` - Connect to VPN
- `POST /api/vpn/disconnect` - Disconnect from VPN
- `GET /api/vpn/status` - Get VPN status
- `POST /api/vpn/block-domain` - Block domain
- `GET /api/vpn/blocked-domains` - Get blocked domains

### Device Endpoints

- `GET /api/device/health` - Get device health metrics
- `GET /api/device/processes` - Get running processes
- `GET /api/device/network` - Get network usage
- `POST /api/device/location` - Update device location
- `POST /api/device/remote-wipe` - Initiate remote wipe

### Apps Endpoints

- `GET /api/apps/installed` - Get installed applications
- `GET /api/apps/running` - Get running applications
- `GET /api/apps/installation-history` - Get installation history
- `GET /api/apps/resource-usage/:appName` - Get app resource usage

### Alerts Endpoints

- `POST /api/alerts/create` - Create new alert
- `GET /api/alerts` - Get all alerts
- `PATCH /api/alerts/:alertId` - Update alert status
- `DELETE /api/alerts/:alertId` - Delete alert
- `GET /api/alerts/subscribe` - Subscribe to real-time alerts
- `GET /api/alerts/stats` - Get alert statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- VirusTotal API for malware scanning
- OpenVPN for secure connections
- System Information library for device metrics 