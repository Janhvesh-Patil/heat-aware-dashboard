import { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import SearchBar from '@/components/SearchBar';
import SensorDisplay from '@/components/SensorDisplay';
import HeatwaveRiskCard from '@/components/HeatwaveRiskCard';
import AirQualityCard from '@/components/AirQualityCard';
import MentalHealthCard from '@/components/MentalHealthCard';
import KeyInsightsPanel from '@/components/KeyInsightsPanel';
import ForecastGrid from '@/components/ForecastGrid';
import TemperatureChart from '@/components/TemperatureChart';
import RecommendationsCard from '@/components/RecommendationsCard';
import { useWeatherData } from '@/hooks/useWeatherData';
import { useSensorData } from '@/hooks/useSensorData';
import { useRiskPrediction } from '@/hooks/useRiskPrediction';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'city' | 'sensor'>('city');
  
  const { weatherData, location, loading: weatherLoading, fetchWeatherByCity } = useWeatherData();
  const { prediction, loading: predictionLoading } = useRiskPrediction(weatherData);
  const { sensorData, loading: sensorLoading } = useSensorData(activeTab === 'sensor');

  const handleSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary to-gradient-end">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mb-8">
          {activeTab === 'city' ? (
            <SearchBar
              onSearch={handleSearch}
              loading={weatherLoading}
              currentLocation={location?.name}
            />
          ) : (
            <SensorDisplay sensorData={sensorData} loading={sensorLoading} />
          )}
        </div>

        {weatherData && (
          <div className="space-y-8">
            {/* Main Risk Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HeatwaveRiskCard
                  weatherData={weatherData}
                  prediction={prediction}
                  loading={predictionLoading}
                />
              </div>
              <div>
                <AirQualityCard
                  latitude={location?.latitude}
                  longitude={location?.longitude}
                />
              </div>
            </div>

            {/* Mental Health & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MentalHealthCard weatherData={weatherData} />
              <KeyInsightsPanel weatherData={weatherData} />
            </div>

            {/* Forecast */}
            <ForecastGrid weatherData={weatherData} />

            {/* Chart */}
            <TemperatureChart weatherData={weatherData} />

            {/* Recommendations */}
            <RecommendationsCard prediction={prediction} weatherData={weatherData} />
          </div>
        )}

        {!weatherData && !weatherLoading && (
          <div className="text-center py-20">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <p className="text-xl text-card-foreground">
                {activeTab === 'city' 
                  ? 'Enter a city name to view climate and health risk insights'
                  : 'Sensor mode active - waiting for temperature data'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
