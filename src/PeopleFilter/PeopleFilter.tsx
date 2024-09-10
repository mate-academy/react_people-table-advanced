import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const gender = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexFilter(sex: string) {
    if (sex) {
      searchParams.set('sex', sex);
    } else {
      searchParams.delete('sex');
    }

    setSearchParams(searchParams);
  }

  function handleCenturyFilter(ch: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(ch)
      ? centuries.filter(centurie => centurie !== ch)
      : [...centuries, ch];

    params.delete('centuries');
    newCenturies.forEach(centurie => params.append('centuries', centurie));
    setSearchParams(params);
  }

  function clearFilter() {
    searchParams.delete('query');
    searchParams.delete('sex');
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={gender === '' ? 'is-active' : ''}
          href="#/people"
          onClick={() => handleSexFilter('')}
        >
          All
        </a>
        <a
          className={gender === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={() => handleSexFilter('m')}
        >
          Male
        </a>
        <a
          className={gender === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={() => handleSexFilter('f')}
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
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  centuries.includes(century.toString()) ? 'is-info' : ''
                }`}
                onClick={() => handleCenturyFilter(century.toString())}
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
              onClick={() => handleCenturyFilter()}
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
          onClick={clearFilter}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
