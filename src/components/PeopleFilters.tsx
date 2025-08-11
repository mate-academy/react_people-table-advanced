import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || '',
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (searchQuery) {
      newSearchParams.set('query', searchQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  }, [searchQuery, searchParams, setSearchParams]);

  const handleFilterClick = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(key) === value) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    setSearchParams(newSearchParams);
  };

  const handleCenturyClick = (century: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentCenturies = newSearchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      const filteredCenturies = currentCenturies.filter(c => c !== century);

      if (filteredCenturies.length > 0) {
        newSearchParams.delete('centuries');
        filteredCenturies.forEach(c => newSearchParams.append('centuries', c));
      } else {
        newSearchParams.delete('centuries');
      }
    } else {
      newSearchParams.append('centuries', century);
    }

    setSearchParams(newSearchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');

    const newSearchParams = new URLSearchParams();

    if (searchParams.get('sort')) {
      newSearchParams.set('sort', searchParams.get('sort')!);
    }

    if (searchParams.get('order')) {
      newSearchParams.set('order', searchParams.get('order')!);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => handleFilterClick('sex', '')}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => handleFilterClick('sex', 'm')}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => handleFilterClick('sex', 'f')}
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
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${searchParams.getAll('centuries').includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newSearchParams = new URLSearchParams();

                if (searchParams.get('sort')) {
                  newSearchParams.set('sort', searchParams.get('sort')!);
                }

                if (searchParams.get('order')) {
                  newSearchParams.set('order', searchParams.get('order')!);
                }

                setSearchParams(newSearchParams);
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
          onClick={() => {
            handleResetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
