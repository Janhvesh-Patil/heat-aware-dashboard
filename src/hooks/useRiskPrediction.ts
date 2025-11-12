import { useState, useEffect } from 'react';
import { flaskApi } from '@/utils/api';
import type { RiskPrediction, WeatherData } from '@/types/weather';

export const useRiskPrediction = (weatherData: WeatherData | null) => {
  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!weatherData) {
      setPrediction(null);
      return;
    }

    const predictRisk = async () => {
      setLoading(true);
      
      const todayIndex = 0;
      const predictionData = {
        temperature_2m_max: weatherData.daily.temperature_2m_max[todayIndex],
        temperature_2m_min: weatherData.daily.temperature_2m_min[todayIndex],
        wind_speed_10m_max: weatherData.daily.wind_speed_10m_max[todayIndex],
        wind_gusts_10m_max: weatherData.daily.wind_gusts_10m_max[todayIndex],
        precipitation_sum: weatherData.daily.precipitation_sum[todayIndex],
      };

      const result = await flaskApi.predict(predictionData);
      
      // Fallback to mock prediction if API unavailable
      if (!result) {
        const mockRisk = predictionData.temperature_2m_max > 40 ? 'High' : 
                        predictionData.temperature_2m_max > 35 ? 'Medium' : 'Low';
        setPrediction({
          risk: mockRisk,
          confidence: {
            low: mockRisk === 'Low' ? 0.85 : 0.15,
            medium: mockRisk === 'Medium' ? 0.75 : 0.20,
            high: mockRisk === 'High' ? 0.80 : 0.05,
          },
          recommendations: [],
        });
      } else {
        setPrediction(result);
      }
      
      setLoading(false);
    };

    predictRisk();
  }, [weatherData]);

  return { prediction, loading };
};
