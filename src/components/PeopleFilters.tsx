import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    if (searchParams.get(key) === value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    setSearchParams(searchParams);
  };

  const handleCenturyClick = (century: string) => {
    const centuries = searchParams.getAll('centuries');

    if (centuries.includes(century)) {
      searchParams.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }

    setSearchParams(searchParams);
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
            {['16', '17', '18', '19', '20'].map(century => (
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
              onClick={() => setSearchParams({})}
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
            setSearchParams({});
            setSearchQuery('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
