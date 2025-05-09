
import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, optionId: string) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  
  const toggleFilter = () => setIsOpen(!isOpen);
  
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  const activeFilterCount = Object.values(activeFilters)
    .reduce((count, options) => count + options.length, 0);
  
  return (
    <div className="mb-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          onClick={toggleFilter}
          variant="outline" 
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center">
            <Filter size={16} className="mr-2" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-dropzone-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </span>
          <ChevronDown size={16} className={isOpen ? "transform rotate-180" : ""} />
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white p-4 md:p-0">
          {/* Clear Filters Button (when there are active filters) */}
          {activeFilterCount > 0 && (
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <span className="font-medium">Filtros Ativos ({activeFilterCount})</span>
              <Button 
                onClick={onClearFilters}
                variant="ghost" 
                className="text-sm flex items-center text-dropzone-gray hover:text-dropzone-black"
              >
                <X size={14} className="mr-1" /> Limpar Todos
              </Button>
            </div>
          )}
          
          {/* Filter Groups */}
          {filters.map(group => (
            <div key={group.id} className="mb-4 pb-4 border-b border-dropzone-gray-light last:border-b-0">
              <button
                className="w-full flex justify-between items-center py-2"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="font-medium">{group.name}</span>
                <ChevronDown 
                  size={16} 
                  className={expandedGroups[group.id] ? "transform rotate-180" : ""}
                />
              </button>
              
              {/* Filter Options */}
              <div className={expandedGroups[group.id] ? "mt-2 space-y-2" : "hidden"}>
                {group.options.map(option => {
                  const isActive = activeFilters[group.id]?.includes(option.id);
                  
                  return (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${group.id}-${option.id}`}
                        checked={isActive}
                        onChange={() => onFilterChange(group.id, option.id)}
                        className="mr-2 h-4 w-4 rounded border-dropzone-gray text-dropzone-black focus:ring-dropzone-black"
                      />
                      <label 
                        htmlFor={`${group.id}-${option.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
