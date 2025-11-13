import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  currentLocation?: string;
}

const SearchBar = ({ onSearch, loading, currentLocation }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city name (e.g., New Delhi, Mumbai, Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !city.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      {currentLocation && (
        <div className="flex justify-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {currentLocation}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
