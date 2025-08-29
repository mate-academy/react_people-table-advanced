import { useCallback } from 'react';
import { SearchParams } from '../utils/searchHelper';

interface PeopleFiltersProps {
  query: string;
  sex: string | null;
  centuries: string[];
  onFilterChange: (params: SearchParams) => void;
}

export const PeopleFilters = ({
  query,
  sex,
  centuries,
  onFilterChange,
}: PeopleFiltersProps) => {
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;

      onFilterChange({
        query: newQuery || null,
      });
    },
    [onFilterChange],
  );

  const handleCenturyToggle = useCallback(
    (century: string) => {
      let newCenturies: string[] = [...centuries];

      if (newCenturies.includes(century)) {
        newCenturies = newCenturies.filter(c => c !== century);
      } else {
        newCenturies.push(century);
      }

      onFilterChange({
        centuries: newCenturies.length ? newCenturies : null,
      });
    },
    [centuries, onFilterChange],
  );

  const handleSexChange = useCallback(
    (newSex: string | null) => {
      onFilterChange({ sex: newSex });
    },
    [onFilterChange],
  );

  const handleResetFilters = useCallback(() => {
    onFilterChange({
      sex: null,
      query: null,
      centuries: null,
      sort: null,
      order: null,
    });
  }, [onFilterChange]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === null ? 'is-active' : ''}
          href="#"
          onClick={e => {
            e.preventDefault();
            handleSexChange(null);
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#"
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#"
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleCenturyToggle(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${centuries.length === 0 ? 'is-success' : 'is-success is-outlined'}`}
              href="#"
              onClick={e => {
                e.preventDefault();
                onFilterChange({ centuries: null });
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#"
          onClick={e => {
            e.preventDefault();
            handleResetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
