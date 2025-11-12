import { useEffect, useState } from 'react';
import { Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { airQualityApi } from '@/utils/api';
import { getAQIColor, getAQIBackgroundColor } from '@/utils/weatherUtils';

interface AirQualityCardProps {
  latitude?: number;
  longitude?: number;
}

const AirQualityCard = ({ latitude, longitude }: AirQualityCardProps) => {
  const [aqiData, setAqiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      airQualityApi.getAQI(latitude, longitude).then((data) => {
        setAqiData(data);
        setLoading(false);
      });
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <Card className="p-6 h-full">
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  if (!aqiData) {
    return (
      <Card className="p-6 h-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Air quality data unavailable</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Wind className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Air Quality Index</h3>
      </div>

      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getAQIBackgroundColor(aqiData.aqi)} mb-3`}>
          <span className={`text-4xl font-bold ${getAQIColor(aqiData.aqi)}`}>
            {aqiData.aqi}
          </span>
        </div>
        <p className={`text-lg font-semibold ${getAQIColor(aqiData.aqi)}`}>
          {aqiData.category}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-3">Health Tips:</p>
        {aqiData.tips.map((tip: string, index: number) => (
          <div key={index} className="flex gap-2 text-sm text-muted-foreground">
            <span className="text-primary">•</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AirQualityCard;
