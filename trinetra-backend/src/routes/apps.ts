import express, { Request, Response } from 'express';
import si from 'systeminformation';

const router = express.Router();

// Mock installed applications data
const mockInstalledApps = [
  {
    name: 'Chrome',
    version: '120.0.6099.130',
    path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  },
  {
    name: 'Firefox',
    version: '121.0',
    path: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
  },
  {
    name: 'Visual Studio Code',
    version: '1.85.1',
    path: 'C:\\Users\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe'
  }
];

// Get installed applications
router.get('/', async (req: Request, res: Response) => {
  try {
    // Return mock data for now
    res.json({
      apps: mockInstalledApps
    });
  } catch (error) {
    console.error('Error getting installed applications:', error);
    res.status(500).json({ error: 'Failed to get installed applications' });
  }
});

// Get running applications
router.get('/running', async (req: Request, res: Response) => {
  try {
    const processes = await si.processes();
    
    res.json({
      apps: processes.list
        .filter(proc => proc.name && proc.name.length > 0)
        .map(proc => ({
          name: proc.name,
          pid: proc.pid,
          cpu: proc.cpu,
          memory: proc.mem
        }))
    });
  } catch (error) {
    console.error('Error getting running applications:', error);
    res.status(500).json({ error: 'Failed to get running applications' });
  }
});

// Get app installation history (mock implementation - would need actual system monitoring)
const installationHistory: any[] = [];

// Record new app installation
router.post('/installation', async (req: Request, res: Response) => {
  try {
    const { appName, version, timestamp } = req.body;
    
    if (!appName || !version) {
      return res.status(400).json({ error: 'App name and version are required' });
    }

    const installation = {
      appName,
      version,
      timestamp: timestamp || new Date().toISOString(),
      status: 'installed'
    };

    installationHistory.push(installation);
    
    res.json({
      status: 'installation recorded',
      installation
    });
  } catch (error) {
    console.error('Error recording installation:', error);
    res.status(500).json({ error: 'Failed to record app installation' });
  }
});

// Get installation history
router.get('/installation-history', async (req: Request, res: Response) => {
  try {
    res.json({
      history: installationHistory
    });
  } catch (error) {
    console.error('Error getting installation history:', error);
    res.status(500).json({ error: 'Failed to get installation history' });
  }
});

// Get app resource usage over time (mock implementation - would need actual monitoring)
router.get('/resource-usage/:appName', async (req: Request, res: Response) => {
  try {
    const { appName } = req.params;
    const processes = await si.processes();
    
    const appProcesses = processes.list.filter(proc => proc.name === appName);
    
    if (appProcesses.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // In a real implementation, this would return historical data
    const usage = {
      appName,
      currentUsage: {
        cpu: appProcesses.reduce((total, proc) => total + proc.cpu, 0),
        memory: appProcesses.reduce((total, proc) => total + proc.mem, 0)
      },
      history: [] // Would contain historical data points
    };

    res.json(usage);
  } catch (error) {
    console.error('Error getting app resource usage:', error);
    res.status(500).json({ error: 'Failed to get app resource usage' });
  }
});

export default router; 