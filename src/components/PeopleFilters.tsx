import { useCallback } from 'react';
import { SearchParams } from '../utils/searchHelper';

interface PeopleFiltersProps {
  query: string | null;
  centuries: string[] | null;
  sex: string | null;
  onFilterChange: (params: SearchParams) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  centuries,
  sex,
  onFilterChange,
}) => {
  // Normalizar valores nulos
  const queryValue = query ?? '';
  const currentCenturies = centuries ?? [];

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value || null;

      onFilterChange({ query: newQuery });
    },
    [onFilterChange],
  );

  const handleCenturyChange = useCallback(
    (century: string) => {
      const newCenturies = currentCenturies.includes(century)
        ? currentCenturies.filter(c => c !== century)
        : [...currentCenturies, century];

      onFilterChange({ centuries: newCenturies.length > 0 ? newCenturies : null });
    },
    [currentCenturies, onFilterChange]
  );

  const handleSexChange = useCallback(
    (newSex: string) => {
      onFilterChange({ sex: newSex === sex ? null : newSex });
    },
    [sex, onFilterChange]
  );

  const handleClearFilters = useCallback(() => {
    onFilterChange({ query: null, centuries: null, sex: null });
  }, [onFilterChange]);

  return (
    <div className="box">
      <h2 className="title is-4">Filters</h2>

      {/* Query Filter */}
      <div className="field">
        <label htmlFor="query-filter" className="label">
          Name
        </label>
        <div className="control">
          <input
            id="query-filter"
            className="input"
            type="text"
            placeholder="Search by name..."
            value={queryValue}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      {/* Centuries Filter */}
      <div className="field">
        <span className="label">Centuries</span>
        <div className="control">
          {['16', '17', '18', '19', '20'].map(century => (
            <div key={century} className="field">
              <label className="checkbox" style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={currentCenturies.includes(century)}
                  onChange={() => handleCenturyChange(century)}
                />
                {' '}{century}th century
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sex Filter */}
      <div className="field">
        <span className="label">Sex</span>
        <div className="control">
          <div className="field">
            <label className="radio">
              <input
                type="radio"
                name="sex"
                checked={sex === 'm'}
                onChange={() => handleSexChange('m')}
              />
              {' '}Male
            </label>
          </div>
          <div className="field">
            <label className="radio">
              <input
                type="radio"
                name="sex"
                checked={sex === 'f'}
                onChange={() => handleSexChange('f')}
              />
              {' '}Female
            </label>
          </div>
          <div className="field">
            <label className="radio">
              <input
                type="radio"
                name="sex"
                checked={sex === null}
                onChange={() => handleSexChange('any')}
              />
              {' '}Any
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="field">
        <div className="control">
          <button className="button is-link is-light" onClick={handleClearFilters}>
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );
};
