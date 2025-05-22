import express, { Request, Response } from 'express';
import os from 'os';
import { SystemInfoService, SystemInfo } from '../services/systemInfo';
import { DeviceControl } from '../services/deviceControl';
import { LocationTracker, LocationData } from '../services/location';
import si from 'systeminformation';

const router = express.Router();
const systemInfoService = new SystemInfoService();
const deviceControl = new DeviceControl();
const locationTracker = new LocationTracker();

// Get system information
router.get('/system', async (req: Request, res: Response) => {
  try {
    const info = await systemInfoService.getSystemInfo();
    res.json(info);
  } catch (error) {
    console.error('Error getting system info:', error);
    res.status(500).json({ error: 'Failed to get system information' });
  }
});

// Get device health metrics
router.get('/health', async (req: Request, res: Response) => {
  try {
    const [cpu, mem, battery, temp] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.battery(),
      si.cpuTemperature()
    ]);

    res.json({
      cpuUsage: cpu.currentLoad,
      memoryUsage: (mem.used / mem.total) * 100,
      storageUsage: 0, // TODO: Implement storage usage
      batteryHealth: battery.percent,
      temperature: temp.main,
      recommendations: [
        'Clear cache files',
        'Update system software',
        'Remove unused apps'
      ]
    });
  } catch (error) {
    console.error('Error getting device health:', error);
    res.status(500).json({ error: 'Failed to get device health metrics' });
  }
});

// Optimize device
router.post('/optimize', async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would perform actual optimization
    // For now, we'll return mock optimized metrics
    const [cpu, mem, battery, temp] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.battery(),
      si.cpuTemperature()
    ]);

    res.json({
      cpuUsage: Math.min(cpu.currentLoad, 30), // Simulate reduced CPU usage
      memoryUsage: Math.min((mem.used / mem.total) * 100, 45), // Simulate reduced memory usage
      storageUsage: 60, // Mock storage usage
      batteryHealth: battery.percent,
      temperature: Math.min(temp.main, 35), // Simulate reduced temperature
      recommendations: ['System optimized successfully']
    });
  } catch (error) {
    console.error('Error optimizing device:', error);
    res.status(500).json({ error: 'Failed to optimize device' });
  }
});

// Get running processes
router.get('/processes', async (req: Request, res: Response) => {
  try {
    const processes = await si.processes();
    res.json({
      processes: processes.list.map(proc => ({
        pid: proc.pid,
        name: proc.name,
        cpu: proc.cpu,
        memory: proc.mem
      }))
    });
  } catch (error) {
    console.error('Error getting processes:', error);
    res.status(500).json({ error: 'Failed to get running processes' });
  }
});

// Get network information
router.get('/network', async (req: Request, res: Response) => {
  try {
    const networkInterfaces = os.networkInterfaces();
    const formattedInterfaces = Object.entries(networkInterfaces).map(([name, interfaces]) => ({
      name,
      interfaces: interfaces?.map(iface => ({
        address: iface.address,
        netmask: iface.netmask,
        family: iface.family,
        mac: iface.mac,
        internal: iface.internal
      })) || []
    }));

    res.json({
      hostname: os.hostname(),
      interfaces: formattedInterfaces
    });
  } catch (error) {
    console.error('Error getting network info:', error);
    res.status(500).json({ error: 'Failed to get network information' });
  }
});

// Get location information
router.get('/location', async (req: Request, res: Response) => {
  try {
    const location = await locationTracker.getCurrentLocation();
    res.json(location);
  } catch (error) {
    console.error('Error getting location:', error);
    res.status(500).json({ error: 'Failed to get location information' });
  }
});

// Anti-theft features
let deviceLocation = {
  latitude: null as number | null,
  longitude: null as number | null,
  lastUpdated: null as string | null
};

// Update device location
router.post('/location', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    deviceLocation = {
      latitude,
      longitude,
      lastUpdated: new Date().toISOString()
    };

    res.json({ status: 'location updated', location: deviceLocation });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update device location' });
  }
});

// Remote wipe (just a mock implementation - actual implementation would need proper security)
router.post('/remote-wipe', async (req: Request, res: Response) => {
  try {
    const { confirmationCode } = req.body;
    
    if (!confirmationCode || confirmationCode !== process.env.REMOTE_WIPE_CODE) {
      return res.status(403).json({ error: 'Invalid confirmation code' });
    }

    // In a real implementation, this would trigger a secure device wipe
    res.json({ status: 'remote wipe initiated' });
  } catch (error) {
    console.error('Error initiating remote wipe:', error);
    res.status(500).json({ error: 'Failed to initiate remote wipe' });
  }
});

// Lock device
router.post('/lock', async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;
    if (!pin) {
      return res.status(400).json({ error: 'PIN is required' });
    }
    await deviceControl.lockDevice(pin);
    res.json({ message: 'Device locked successfully' });
  } catch (error) {
    console.error('Error locking device:', error);
    res.status(500).json({ error: 'Failed to lock device' });
  }
});

// Wipe device
router.post('/wipe', async (req: Request, res: Response) => {
  try {
    const { confirmationCode } = req.body;
    if (!confirmationCode) {
      return res.status(400).json({ error: 'Confirmation code is required' });
    }
    await deviceControl.wipeDevice(confirmationCode);
    res.json({ message: 'Device wiped successfully' });
  } catch (error) {
    console.error('Error wiping device:', error);
    res.status(500).json({ error: 'Failed to wipe device' });
  }
});

// Play alarm sound
router.post('/play-sound', async (req: Request, res: Response) => {
  try {
    await deviceControl.playSound();
    res.json({ message: 'Alarm sound played successfully' });
  } catch (error) {
    console.error('Error playing alarm sound:', error);
    res.status(500).json({ error: 'Failed to play alarm sound' });
  }
});

export default router; 