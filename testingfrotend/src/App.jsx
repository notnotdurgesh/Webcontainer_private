import React, { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';
import files from "./file"
import '@xterm/xterm/css/xterm.css';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Loader2, 
  Server, 
  AlertTriangle, 
  Check 
} from 'lucide-react';
import file from './file';

const App = () => {
  const [webContainerInstance, setWebContainerInstance] = useState(null);
  const [status, setStatus] = useState({
    initialized: false,
    loading: false,
    serverReady: false,
    error: null
  });
  
  const iframeRef = useRef(null);
  const terminalRef = useRef(null);
  const terminalInstanceRef = useRef(null);

  // Terminal initialization
  useEffect(() => {
    if (terminalRef.current && !terminalInstanceRef.current) {
      const terminal = new Terminal({
        convertEol: true,
        rows: 15,
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4'
        }
      });
      terminal.open(terminalRef.current);
      terminalInstanceRef.current = terminal;
    }
  }, []);

  // Utility for writing to terminal
  const writeToTerminal = (message, type = 'default') => {
    if (!terminalInstanceRef.current) return;

    const colors = {
      default: '\x1b[37m', // White
      error: '\x1b[31m',   // Red
      success: '\x1b[32m', // Green
      info: '\x1b[34m'     // Blue
    };

    const colorCode = colors[type] || colors.default;
    terminalInstanceRef.current.write(`${colorCode}${message}\r\n\x1b[0m`);
  };

  // Fetch project files from backend
  const fetchProjectFiles = () => {
    try {
      const response = file || files;
      console.log(files)
      return response
    } catch (error) {
      writeToTerminal(`File Fetch Error: ${error.message}`, 'error');
      throw error;
    }
  };

  // Initialize WebContainer on mount
  useEffect(() => {
    const initWebContainer = async () => {
      try {
        const instance = await WebContainer.boot();
        setWebContainerInstance(instance);
        setStatus(prev => ({ ...prev, initialized: true }));
      } catch (error) {
        if (error.message !== "Only a single WebContainer instance can be booted") {
          writeToTerminal(`Initialization Error: ${error.message}`, 'error');
          setStatus(prev => ({ 
            ...prev, 
            initialized: false, 
            error: error.message 
          }));
        } else {
          // If already booted, consider it initialized
          setStatus(prev => ({ ...prev, initialized: true }));
        }
      }
    };

    initWebContainer();
  }, []);

  // Start development environment
  const startDevEnvironment = async () => {
    // Reset status
    setStatus(prev => ({
      ...prev, 
      loading: true, 
      serverReady: false, 
      error: null
    }));

    // Clear previous terminal
    terminalInstanceRef.current?.clear();

    try {
      if (!webContainerInstance) {
        throw new Error('WebContainer not initialized');
      }

      writeToTerminal('Initializing WebContainer...', 'info');

      // Fetch and mount files
      writeToTerminal('Fetching project files...', 'info');
      const files = await fetchProjectFiles();
      await webContainerInstance.mount(files);

      // Install dependencies
      writeToTerminal('Installing dependencies...', 'info');
      const installProcess = await webContainerInstance.spawn('npm', ['install']);
      
      const installResult = await installProcess.exit;
      if (installResult !== 0) {
        throw new Error('Dependency installation failed');
      }

      // Start development server
      writeToTerminal('Starting development server...', 'info');
      const devProcess = await webContainerInstance.spawn('npm', ['run', 'dev']);

      // Handle server readiness
      webContainerInstance.on('server-ready', (port, url) => {
        writeToTerminal(`Server ready at ${url}`, 'success');
        setStatus(prev => ({
          ...prev, 
          serverReady: true, 
          loading: false
        }));
        
        if (iframeRef.current) {
          iframeRef.current.src = url;
        }
      });

    } catch (error) {
      writeToTerminal(`Error: ${error.message}`, 'error');
      setStatus(prev => ({
        ...prev, 
        loading: false, 
        error: error.message
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-6 h-6" />
            <span>WebContainer Development Environment</span>
          </CardTitle>
          <CardDescription>
            Instant web development sandbox powered by WebContainer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Action Button */}
          <div className="mb-4 flex items-center space-x-2">
            <Button 
              onClick={startDevEnvironment}
              disabled={status.loading || !status.initialized}
              className="flex items-center space-x-2"
            >
              {status.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>
                {status.loading 
                  ? 'Starting...' 
                  : !status.initialized 
                    ? 'Initializing...' 
                    : 'Start Development'}
              </span>
            </Button>

            {status.serverReady && (
              <div className="text-green-600 flex items-center space-x-1">
                <Check className="w-5 h-5" />
                <span>Server Ready</span>
              </div>
            )}
          </div>

          {/* Error Handling */}
          {status.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>{status.error}</span>
            </div>
          )}

          {/* Preview Iframe */}
          <div className="border rounded-lg overflow-hidden mb-4 relative">
            <iframe
              ref={iframeRef}
              className="w-full h-[500px] bg-gray-50"
              title="WebContainer Preview"
            />
          </div>

          {/* Terminal */}
          <div 
            ref={terminalRef} 
            className="w-full rounded-lg overflow-hidden shadow-md"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;