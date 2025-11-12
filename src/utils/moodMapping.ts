export interface MoodInsight {
  mood: string;
  why: string;
  tips: string[];
}

export const getMoodInsights = (temperature: number, precipitation: number): MoodInsight => {
  // Hot weather (>35°C)
  if (temperature > 35) {
    return {
      mood: "Irritable, drained, low patience",
      why: "Heat taxes the body, lowering cognitive stamina and emotional regulation",
      tips: [
        "Avoid important decisions during peak heat hours (12-4 PM)",
        "Stay hydrated - dehydration directly affects mood and focus",
        "Take cooling breaks every 45-60 minutes",
        "Be patient with yourself and others",
        "Use cooling techniques: cold showers, ice packs on wrists",
      ],
    };
  }

  // Rainy weather
  if (precipitation > 10) {
    return {
      mood: "Cozy, introspective, prone to melancholy",
      why: "Reduced sunlight and barometric pressure changes affect serotonin levels",
      tips: [
        "Create a bright, comfortable indoor environment",
        "Good time for reflective or creative tasks",
        "Use bright indoor lighting to compensate for low natural light",
        "Stay socially connected - reach out to friends",
        "Consider light exercise to boost mood naturally",
      ],
    };
  }

  // Moderate heat (30-35°C)
  if (temperature >= 30) {
    return {
      mood: "Energetic but need balance",
      why: "Warm temperatures boost activity but require mindful self-care",
      tips: [
        "Stay hydrated throughout the day",
        "Balance outdoor activities with rest",
        "Wear light, breathable clothing",
        "Take advantage of natural energy for tasks",
        "Monitor for signs of heat stress",
      ],
    };
  }

  // Pleasant weather (20-30°C)
  if (temperature >= 20) {
    return {
      mood: "Energized, optimistic, social",
      why: "Comfortable temperatures support physical and mental well-being",
      tips: [
        "Take advantage of natural energy for important tasks",
        "Good time for outdoor activities and social connections",
        "Maintain regular sleep and exercise routines",
        "Stay hydrated even in comfortable weather",
        "Practice gratitude for favorable conditions",
      ],
    };
  }

  // Cool weather (<20°C)
  return {
    mood: "Calm, focused, reflective",
    why: "Cool temperatures encourage concentration and introspection",
    tips: [
      "Good conditions for focused, detail-oriented work",
      "Create a warm, comfortable workspace",
      "Use this time for planning and organization",
      "Stay physically active to maintain energy",
      "Layer clothing for comfort",
    ],
  };
};

export const getHeatAccumulationDays = (temperatures: number[]): number => {
  let consecutiveDays = 0;
  for (const temp of temperatures) {
    if (temp > 35) {
      consecutiveDays++;
    } else {
      break;
    }
  }
  return consecutiveDays;
};

export const getPeakRiskHours = (): string => {
  return "12:00 PM - 4:00 PM";
};

export const getVulnerableGroups = (): string[] => {
  return [
    "Elderly (65+ years)",
    "Children under 5",
    "Outdoor workers",
    "Pregnant women",
    "People with chronic conditions",
  ];
};
