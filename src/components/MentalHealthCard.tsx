import { Brain, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { WeatherData } from '@/types/weather';
import { getMoodInsights } from '@/utils/moodMapping';

interface MentalHealthCardProps {
  weatherData: WeatherData | null;
}

const MentalHealthCard = ({ weatherData }: MentalHealthCardProps) => {
  if (!weatherData) {
    return null;
  }

  const temperature = weatherData.current.temperature_2m;
  const precipitation = weatherData.daily.precipitation_sum[0];
  const moodInsight = getMoodInsights(temperature, precipitation);

  return (
    <Card className="p-6 border-mental-health-border bg-gradient-to-br from-mental-health-bg to-mental-health-bg/50">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Weather & Well-being</h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Current Mood State:</p>
          <p className="text-lg font-semibold text-foreground">{moodInsight.mood}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Why:</p>
          <p className="text-sm text-foreground">{moodInsight.why}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Self-Care Tips:</p>
          <div className="space-y-2">
            {moodInsight.tips.map((tip, index) => (
              <div key={index} className="flex gap-2 text-sm text-foreground">
                <span className="text-primary">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-900 dark:text-blue-100">
            This is not medical advice. For mental health support, contact: 
            <span className="font-semibold"> National Mental Health Helpline: 1800-599-0019</span>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};

export default MentalHealthCard;
