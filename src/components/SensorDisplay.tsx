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
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">
          Functionality to be added
        </p>
      </div>
    </Card>
  );
};

export default SensorDisplay;
