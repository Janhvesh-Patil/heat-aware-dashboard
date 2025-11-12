import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeatherData } from '@/types/weather';
import { formatDate, getRiskColor, getRiskEmoji } from '@/utils/weatherUtils';

interface ForecastGridProps {
  weatherData: WeatherData | null;
}

const ForecastGrid = ({ weatherData }: ForecastGridProps) => {
  if (!weatherData) {
    return null;
  }

  const getRiskLevel = (temp: number): string => {
    if (temp > 40) return 'High';
    if (temp > 35) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">7-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weatherData.daily.time.map((date, index) => {
          const temp = weatherData.daily.temperature_2m_max[index];
          const risk = getRiskLevel(temp);
          const riskColor = getRiskColor(risk);
          const riskEmoji = getRiskEmoji(risk);

          return (
            <Card
              key={date}
              className="p-4 text-center hover:shadow-lg transition-shadow duration-200 hover:-translate-y-1"
            >
              <p className="text-sm font-medium mb-2">{formatDate(date)}</p>
              <p className="text-2xl font-bold mb-3">{temp.toFixed(0)}°C</p>
              <Badge className={`${riskColor} text-white text-xs`}>
                {riskEmoji} {risk}
              </Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastGrid;
