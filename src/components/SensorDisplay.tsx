import { Thermometer, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { SensorData } from '@/types/weather';

interface SensorDisplayProps {
  sensorData: SensorData | null;
  loading: boolean;
}

const SensorDisplay = ({ sensorData, loading }: SensorDisplayProps) => {
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg py-2 px-4">
          <Activity className="h-4 w-4" />
          <span className="text-sm font-medium">Demo Mode Active</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live Sensor Reading</span>
            {sensorData?.status === 'connected' && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>
          
          <div className="text-6xl font-bold text-foreground">
            {loading ? (
              <span className="text-muted-foreground">--</span>
            ) : sensorData ? (
              `${sensorData.temperature.toFixed(1)}°C`
            ) : (
              <span className="text-muted-foreground text-2xl">Connecting...</span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Sensor ID: <span className="font-mono">ESP32-A1</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Status: {sensorData?.status === 'connected' ? (
              <span className="text-green-600">Connected</span>
            ) : (
              <span className="text-red-600">Disconnected</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SensorDisplay;
