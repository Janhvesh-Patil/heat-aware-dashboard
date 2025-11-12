import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import type { WeatherData } from '@/types/weather';
import { formatDate } from '@/utils/weatherUtils';

interface TemperatureChartProps {
  weatherData: WeatherData | null;
}

const TemperatureChart = ({ weatherData }: TemperatureChartProps) => {
  if (!weatherData) {
    return null;
  }

  const chartData = weatherData.daily.time.map((date, index) => ({
    date: formatDate(date),
    temperature: weatherData.daily.temperature_2m_max[index],
  }));

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Temperature Trend</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e8f5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#e8f5e9" stopOpacity={0.8}/>
            </linearGradient>
            <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff9c4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fff9c4" stopOpacity={0.8}/>
            </linearGradient>
            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffebee" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffebee" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <ReferenceArea y1={0} y2={35} fill="url(#colorGreen)" fillOpacity={1} />
          <ReferenceArea y1={35} y2={40} fill="url(#colorYellow)" fillOpacity={1} />
          <ReferenceArea y1={40} y2={100} fill="url(#colorRed)" fillOpacity={1} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[0, 50]}
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <ReferenceLine
            y={35}
            stroke="hsl(var(--risk-medium))"
            strokeDasharray="3 3"
            label={{ value: 'Caution', position: 'right', fill: 'hsl(var(--muted-foreground))' }}
          />
          <ReferenceLine
            y={40}
            stroke="hsl(var(--risk-high))"
            strokeDasharray="3 3"
            label={{ value: 'Danger', position: 'right', fill: 'hsl(var(--muted-foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TemperatureChart;
