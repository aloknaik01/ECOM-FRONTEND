import { Input } from '../../../components/common/Input';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import { Search, X } from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  AVAILABILITY_OPTIONS,
  PRICE_RANGES,
  RATING_OPTIONS,
} from '../../../utils/constants';

export const ProductFilters = ({
  filters,
  onFilterChange,
  searchValue,
  onSearchChange,
}) => {
  const handleClearFilters = () => {
    onSearchChange('');
    onFilterChange('category', '');
    onFilterChange('availability', '');
    onFilterChange('priceRange', '');
    onFilterChange('ratings', '');
  };

  const hasActiveFilters =
    searchValue ||
    filters.category ||
    filters.availability ||
    filters.priceRange ||
    filters.ratings;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>

      <CardBody className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
        </div>

        {/* Category */}
        <Select
          label="Category"
          options={PRODUCT_CATEGORIES}
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        />

        {/* Price Range */}
        <Select
          label="Price Range"
          options={PRICE_RANGES}
          value={filters.priceRange}
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
        />

        {/* Availability */}
        <Select
          label="Availability"
          options={AVAILABILITY_OPTIONS}
          value={filters.availability}
          onChange={(e) => onFilterChange('availability', e.target.value)}
        />

        {/* Ratings */}
        <Select
          label="Ratings"
          options={RATING_OPTIONS}
          value={filters.ratings}
          onChange={(e) => onFilterChange('ratings', e.target.value)}
        />
      </CardBody>
    </Card>
  );
};