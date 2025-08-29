'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlassWater, Hospital, PersonStanding } from 'lucide-react';
import { cn } from '@/lib/utils';

type ServiceCategory = 'water' | 'medical' | 'toilets';

const services = [
  { id: 1, category: 'water', name: 'Water Booth A', position: { top: '20%', left: '30%' } },
  { id: 2, category: 'medical', name: 'Medical Camp 1', position: { top: '40%', left: '50%' } },
  { id: 3, category: 'toilets', name: 'Public Toilet X', position: { top: '60%', left: '25%' } },
  { id: 4, category: 'water', name: 'Water Booth B', position: { top: '75%', left: '70%' } },
  { id: 5, category: 'medical', name: 'First Aid Post 2', position: { top: '15%', left: '80%' } },
];

const categoryIcons: Record<ServiceCategory, React.ElementType> = {
  water: GlassWater,
  medical: Hospital,
  toilets: PersonStanding,
};

export default function MapPage() {
  const [activeFilters, setActiveFilters] = useState<Set<ServiceCategory>>(
    new Set(['water', 'medical', 'toilets'])
  );

  const toggleFilter = (category: ServiceCategory) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(category)) {
        newFilters.delete(category);
      } else {
        newFilters.add(category);
      }
      return newFilters;
    });
  };

  const filteredServices = services.filter((service) =>
    activeFilters.has(service.category as ServiceCategory)
  );

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center font-headline">Interactive Map</h1>
      
      <Card className="mb-4">
        <CardContent className="p-4 flex flex-wrap justify-center gap-2">
          <FilterButton category="water" activeFilters={activeFilters} onToggle={toggleFilter} />
          <FilterButton category="medical" activeFilters={activeFilters} onToggle={toggleFilter} />
          <FilterButton category="toilets" activeFilters={activeFilters} onToggle={toggleFilter} />
        </CardContent>
      </Card>
      
      <div className="flex-grow w-full h-[50vh] relative rounded-lg overflow-hidden border">
        <Image
          src="https://picsum.photos/800/600"
          alt="Map of Ujjain"
          data-ai-hint="map ujjain"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-50"
        />
        {filteredServices.map((service) => {
          const Icon = categoryIcons[service.category as ServiceCategory];
          return (
            <div
              key={service.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: service.position.top, left: service.position.left }}
            >
              <div className="relative group">
                <Icon className="w-8 h-8 text-primary bg-background rounded-full p-1 shadow-lg" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-foreground text-background text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {service.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterButton({
  category,
  activeFilters,
  onToggle,
}: {
  category: ServiceCategory;
  activeFilters: Set<ServiceCategory>;
  onToggle: (category: ServiceCategory) => void;
}) {
  const Icon = categoryIcons[category];
  const isActive = activeFilters.has(category);
  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      onClick={() => onToggle(category)}
      className={cn(
        'capitalize transition-all',
        isActive && 'bg-primary hover:bg-primary/90'
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {category}
    </Button>
  );
}
