import { TrendingUp, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { WeatherData } from '@/types/weather';
import { getHeatAccumulationDays, getPeakRiskHours, getVulnerableGroups } from '@/utils/moodMapping';

interface KeyInsightsPanelProps {
  weatherData: WeatherData | null;
}

const KeyInsightsPanel = ({ weatherData }: KeyInsightsPanelProps) => {
  if (!weatherData) {
    return null;
  }

  const consecutiveHotDays = getHeatAccumulationDays(weatherData.daily.temperature_2m_max);
  const peakHours = getPeakRiskHours();
  const vulnerableGroups = getVulnerableGroups();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Key Insights</h3>
      
      <div className="space-y-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="font-medium mb-1">Heat Accumulation</p>
            <p className="text-sm text-muted-foreground">
              {consecutiveHotDays > 0 
                ? `${consecutiveHotDays} consecutive day${consecutiveHotDays > 1 ? 's' : ''} above 35°C`
                : 'No prolonged heat accumulation detected'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="font-medium mb-2">Vulnerable Groups</p>
            <div className="space-y-1">
              {vulnerableGroups.map((group, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  • {group}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="font-medium mb-1">Peak Risk Hours</p>
            <p className="text-sm text-muted-foreground">
              {peakHours} - Avoid outdoor exposure during these hours
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KeyInsightsPanel;
