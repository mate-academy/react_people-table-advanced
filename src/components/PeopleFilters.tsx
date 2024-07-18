import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setSearchParams(prevParams => {
      if (query) {
        prevParams.set('query', query);
      } else {
        prevParams.delete('query');
      }

      return prevParams;
    });
  }, [query, setSearchParams]);

  const handleCenturyClick = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    setSearchParams(prevParams => {
      prevParams.delete('centuries');
      newCenturies.forEach(c => prevParams.append('centuries', c));

      return prevParams;
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          href="#/people"
          onClick={() => setSearchParams({})}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={() => setSearchParams({ sex: 'm' })}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={() => setSearchParams({ sex: 'f' })}
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
            onChange={e => setQuery(e.target.value)}
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
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleCenturyClick(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
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
          href="#/people"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
