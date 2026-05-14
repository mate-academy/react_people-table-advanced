import { useCallback } from 'react';

interface PeopleFiltersProps {
  searchParams: URLSearchParams;
  onSearchParamsChange: (params: URLSearchParams) => void;
}

export const PeopleFilters = ({
  searchParams,
  onSearchParamsChange,
}: PeopleFiltersProps) => {
  const handleSexChange = useCallback(
    (sex: string | null) => {
      const newParams = new URLSearchParams(searchParams);

      if (sex) {
        newParams.set('sex', sex);
      } else {
        newParams.delete('sex');
      }

      onSearchParamsChange(newParams);
    },
    [searchParams, onSearchParamsChange],
  );

  const handleNameChange = useCallback(
    (query: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (query) {
        newParams.set('query', query);
      } else {
        newParams.delete('query');
      }

      onSearchParamsChange(newParams);
    },
    [searchParams, onSearchParamsChange],
  );

  const handleCenturyChange = useCallback(
    (century: string) => {
      const newParams = new URLSearchParams(searchParams);
      const centuries = newParams.getAll('centuries');
      const index = centuries.indexOf(century);

      if (index > -1) {
        centuries.splice(index, 1);
      } else {
        centuries.push(century);
      }

      newParams.delete('centuries');
      centuries.forEach(c => newParams.append('centuries', c));

      onSearchParamsChange(newParams);
    },
    [searchParams, onSearchParamsChange],
  );

  const handleResetFilters = useCallback(() => {
    onSearchParamsChange(new URLSearchParams());
  }, [onSearchParamsChange]);

  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!currentSex ? 'is-active' : ''}
          onClick={() => handleSexChange(null)}
          style={{ cursor: 'pointer' }}
        >
          All
        </a>
        <a
          className={currentSex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
          style={{ cursor: 'pointer' }}
        >
          Male
        </a>
        <a
          className={currentSex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
          style={{ cursor: 'pointer' }}
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
            value={currentQuery}
            onChange={e => handleNameChange(e.target.value)}
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
                className={`button mr-1 ${currentCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyChange(century)}
                style={{ cursor: 'pointer' }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleResetFilters}
              style={{ cursor: 'pointer' }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
          style={{ cursor: 'pointer' }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
