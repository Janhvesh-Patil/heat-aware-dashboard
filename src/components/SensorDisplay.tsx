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
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live Temperature Reading</span>
            {sensorData?.status === 'connected' && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>
          
          <div className="text-[64px] font-bold text-foreground leading-none">
            {loading ? (
              <span className="text-muted-foreground">--</span>
            ) : sensorData ? (
              `${sensorData.temperature.toFixed(1)}°C`
            ) : (
              `${(Math.random() * 10 + 38).toFixed(1)}°C`
            )}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Sensor ID: <span className="font-mono">ESP32-A1</span>
          </p>
          <p className="text-xs">
            Status: {sensorData?.status === 'connected' ? (
              <span className="text-green-600 font-medium">Connected</span>
            ) : (
              <span className="text-red-600 font-medium">Disconnected</span>
            )}
          </p>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg py-3 px-4 mt-6">
          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
            ⚡ Demo Mode: Simulating extreme heat conditions for presentation
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SensorDisplay;
