import { AlertTriangle, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { RiskPrediction, WeatherData } from '@/types/weather';
import { getRecommendations } from '@/utils/weatherUtils';

interface RecommendationsCardProps {
  prediction: RiskPrediction | null;
  weatherData: WeatherData | null;
}

const RecommendationsCard = ({ prediction, weatherData }: RecommendationsCardProps) => {
  if (!prediction || !weatherData) {
    return null;
  }

  const temperature = weatherData.current.temperature_2m;
  const recommendations = getRecommendations(prediction.risk, temperature);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Health Recommendations</h3>
      
      <Alert className="mb-6 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-sm text-yellow-900 dark:text-yellow-100">
          <span className="font-semibold">Actions for {prediction.risk} Risk Conditions</span>
        </AlertDescription>
      </Alert>

      <div className="space-y-3 mb-6">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-primary font-bold">•</span>
            <p className="text-sm text-foreground flex-1">{recommendation}</p>
          </div>
        ))}
      </div>

      <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
        <Phone className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-sm text-red-900 dark:text-red-100">
          <p className="font-semibold mb-1">Emergency Contacts:</p>
          <p>Ambulance: <span className="font-bold">102</span></p>
          <p>National Health Helpline: <span className="font-bold">1800-180-1104</span></p>
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default RecommendationsCard;
