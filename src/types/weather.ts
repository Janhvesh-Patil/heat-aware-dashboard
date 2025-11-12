export interface WeatherData {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    relative_humidity_2m_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    precipitation_sum: number[];
  };
}

export interface RiskPrediction {
  risk: 'Low' | 'Medium' | 'High';
  confidence: {
    low: number;
    medium: number;
    high: number;
  };
  recommendations: string[];
}

export interface SensorData {
  temperature: number;
  status: 'connected' | 'disconnected';
}

export interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  admin1?: string;
}
