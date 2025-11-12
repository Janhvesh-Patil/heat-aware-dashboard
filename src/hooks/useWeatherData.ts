import { useState, useCallback } from 'react';
import { weatherApi } from '@/utils/api';
import type { WeatherData, GeocodingResult } from '@/types/weather';
import { toast } from '@/hooks/use-toast';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Geocode city name
      const geocodeResult = await weatherApi.geocodeCity(cityName);
      
      if (!geocodeResult) {
        setError('City not found. Please try another city name.');
        toast({
          title: "City not found",
          description: "Please check the spelling and try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setLocation(geocodeResult);

      // Fetch weather data
      const weather = await weatherApi.getWeather(geocodeResult.latitude, geocodeResult.longitude);
      
      if (!weather) {
        setError('Failed to fetch weather data. Please try again.');
        toast({
          title: "Error",
          description: "Failed to fetch weather data.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setWeatherData(weather);
      toast({
        title: "Success",
        description: `Weather data loaded for ${geocodeResult.name}`,
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('An unexpected error occurred.');
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoordinates = useCallback(async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const weather = await weatherApi.getWeather(latitude, longitude);
      
      if (!weather) {
        setError('Failed to fetch weather data.');
        setLoading(false);
        return;
      }

      setWeatherData(weather);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    location,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoordinates,
  };
};
