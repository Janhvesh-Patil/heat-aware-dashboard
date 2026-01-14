import axios from 'axios';
import type { WeatherData, RiskPrediction, SensorData, GeocodingResult } from '@/types/weather';

const FLASK_API_URL = 'https://climawell-api.onrender.com';
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

// Flask API endpoints
export const flaskApi = {
  healthCheck: async () => {
    try {
      const response = await axios.get(`${FLASK_API_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Flask API health check failed:', error);
      return { status: 'unavailable', model_loaded: false };
    }
  },

  predict: async (weatherData: {
    temperature_2m_max: number;
    temperature_2m_min: number;
    wind_speed_10m_max: number;
    wind_gusts_10m_max: number;
    precipitation_sum: number;
  }): Promise<RiskPrediction | null> => {
    try {
      const response = await axios.post(`${FLASK_API_URL}/predict`, weatherData);
      return response.data;
    } catch (error) {
      console.error('Prediction failed:', error);
      return null;
    }
  },

  getSensor: async (): Promise<SensorData | null> => {
    try {
      const response = await axios.get(`${FLASK_API_URL}/sensor`);
      return response.data;
    } catch (error) {
      console.error('Sensor reading failed:', error);
      return null;
    }
  },

  predictFromSensor: async () => {
    try {
      const response = await axios.get(`${FLASK_API_URL}/predict-sensor`);
      return response.data;
    } catch (error) {
      console.error('Sensor prediction failed:', error);
      return null;
    }
  },
};

// Open-Meteo API endpoints
export const weatherApi = {
  geocodeCity: async (cityName: string): Promise<GeocodingResult | null> => {
    try {
      const response = await axios.get(`${GEOCODING_URL}/search`, {
        params: {
          name: cityName,
          count: 1,
          language: 'en',
          format: 'json',
        },
      });
      
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  },

  getWeather: async (latitude: number, longitude: number): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/forecast`, {
        params: {
          latitude,
          longitude,
          daily: 'temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,wind_speed_10m_max,wind_gusts_10m_max,precipitation_sum',
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m',
          timezone: 'auto',
          forecast_days: 7,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Weather fetch failed:', error);
      return null;
    }
  },
};

// Mock Air Quality API (replace with real API if available)
export const airQualityApi = {
  getAQI: async (latitude: number, longitude: number) => {
    // Mock data for now - replace with real API
    const mockAQI = Math.floor(Math.random() * 150) + 20;
    return {
      aqi: mockAQI,
      category: mockAQI < 50 ? 'Good' : mockAQI < 100 ? 'Moderate' : mockAQI < 150 ? 'Unhealthy for Sensitive Groups' : 'Unhealthy',
      tips: [
        'Air quality is acceptable for most people',
        'Sensitive groups should consider reducing prolonged outdoor activities',
        'Keep windows open for ventilation',
        'Monitor air quality throughout the day',
      ],
    };
  },
};
