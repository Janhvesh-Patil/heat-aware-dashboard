import { Thermometer, Droplets, Wind, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { WeatherData, RiskPrediction } from '@/types/weather';
import { getRiskColor, getRiskEmoji, getRiskDescription } from '@/utils/weatherUtils';

interface HeatwaveRiskCardProps {
  weatherData: WeatherData | null;
  prediction: RiskPrediction | null;
  loading: boolean;
}

const HeatwaveRiskCard = ({ weatherData, prediction, loading }: HeatwaveRiskCardProps) => {
  if (loading) {
    return (
      <Card className="p-6 h-full">
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  if (!weatherData || !prediction) {
    return (
      <Card className="p-6 h-full flex items-center justify-center">
        <p className="text-muted-foreground">Search for a city to view risk data</p>
      </Card>
    );
  }

  const current = weatherData.current;
  const today = weatherData.daily;
  const riskColor = getRiskColor(prediction.risk);
  const riskEmoji = getRiskEmoji(prediction.risk);

  return (
    <Card className="p-6 h-full">
      <h3 className="text-xl font-semibold mb-6">Heatwave Risk Monitor</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Thermometer className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-xs text-muted-foreground">Max Temp</p>
            <p className="text-lg font-semibold">{today.temperature_2m_max[0].toFixed(1)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs text-muted-foreground">Feels Like</p>
            <p className="text-lg font-semibold">{current.apparent_temperature.toFixed(1)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-lg font-semibold">{current.relative_humidity_2m}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Wind className="h-5 w-5 text-cyan-500" />
          <div>
            <p className="text-xs text-muted-foreground">Wind Speed</p>
            <p className="text-lg font-semibold">{current.wind_speed_10m.toFixed(1)} km/h</p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 py-6">
        <Badge className={`${riskColor} text-white text-xl px-6 py-3 text-base`}>
          {riskEmoji} {prediction.risk} Risk
        </Badge>
        
        <div className="text-sm text-muted-foreground">
          Confidence: {(Math.max(...Object.values(prediction.confidence)) * 100).toFixed(0)}%
        </div>
        
        <p className="text-sm text-foreground max-w-md mx-auto">
          {getRiskDescription(prediction.risk)}
        </p>
      </div>
    </Card>
  );
};

export default HeatwaveRiskCard;
