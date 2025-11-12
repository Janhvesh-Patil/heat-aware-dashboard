import { Globe, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabNavigationProps {
  activeTab: 'city' | 'sensor';
  onTabChange: (tab: 'city' | 'sensor') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex gap-2 justify-center mb-6">
      <Button
        variant={activeTab === 'city' ? 'default' : 'outline'}
        onClick={() => onTabChange('city')}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        City Search Mode
      </Button>
      <Button
        variant={activeTab === 'sensor' ? 'default' : 'outline'}
        onClick={() => onTabChange('sensor')}
        className="flex items-center gap-2"
      >
        <Microscope className="h-4 w-4" />
        Live Sensor Demo
      </Button>
    </div>
  );
};

export default TabNavigation;
