import { useState, useEffect, useCallback } from 'react';
import { flaskApi } from '@/utils/api';
import type { SensorData } from '@/types/weather';

export const useSensorData = (enabled: boolean) => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSensorData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    const data = await flaskApi.getSensor();
    setSensorData(data);
    setLoading(false);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchSensorData();

    // Poll every 2 seconds
    const interval = setInterval(fetchSensorData, 2000);

    return () => clearInterval(interval);
  }, [enabled, fetchSensorData]);

  return { sensorData, loading };
};
