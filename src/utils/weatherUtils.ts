export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getRiskColor = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case 'low':
      return 'bg-risk-low';
    case 'medium':
      return 'bg-risk-medium';
    case 'high':
      return 'bg-risk-high';
    default:
      return 'bg-muted';
  }
};

export const getRiskEmoji = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case 'low':
      return '🟢';
    case 'medium':
      return '🟡';
    case 'high':
      return '🔴';
    default:
      return '⚪';
  }
};

export const getRiskDescription = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case 'low':
      return 'Conditions are favorable. Normal precautions apply.';
    case 'medium':
      return 'Moderate risk. Take extra precautions during peak hours.';
    case 'high':
      return 'High risk conditions. Limit outdoor exposure and stay hydrated.';
    default:
      return 'Risk assessment unavailable';
  }
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'text-risk-low';
  if (aqi <= 100) return 'text-risk-medium';
  if (aqi <= 150) return 'text-orange-500';
  return 'text-risk-high';
};

export const getAQIBackgroundColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-risk-low/10';
  if (aqi <= 100) return 'bg-risk-medium/10';
  if (aqi <= 150) return 'bg-orange-500/10';
  return 'bg-risk-high/10';
};

export const getRecommendations = (risk: string, temperature: number): string[] => {
  const baseRecommendations = {
    low: [
      "Stay hydrated with 8-10 glasses of water daily",
      "Wear light-colored, breathable clothing",
      "Use sunscreen (SPF 30+) if spending time outdoors",
      "Maintain regular activity levels with normal precautions",
      "Keep emergency contacts readily available",
    ],
    medium: [
      "Limit strenuous outdoor activities between 12 PM - 4 PM",
      "Drink water every 15-20 minutes during physical activity",
      "Wear wide-brimmed hats and UV-protective sunglasses",
      "Take frequent breaks in shaded or air-conditioned areas",
      "Monitor for signs of heat stress (dizziness, nausea, rapid heartbeat)",
      "Check on elderly neighbors and vulnerable family members",
    ],
    high: [
      "AVOID outdoor activities during peak heat (12-4 PM)",
      "Stay in air-conditioned spaces as much as possible",
      "Drink water continuously - don't wait to feel thirsty",
      "Never leave children or pets in vehicles",
      "Watch for heat exhaustion symptoms: heavy sweating, weakness, cold/clammy skin",
      "Know heat stroke warning signs: hot/dry skin, confusion, unconsciousness - CALL 911",
      "Use cooling techniques: cold showers, damp towels, ice packs",
    ],
  };

  const riskLevel = risk.toLowerCase() as keyof typeof baseRecommendations;
  return baseRecommendations[riskLevel] || baseRecommendations.low;
};
