import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  function setGenderFilter(filterElement: string) {
    const params = new URLSearchParams(searchParams);

    if (filterElement === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', filterElement);
    }

    return `?${params.toString()}`;
  }

  function setQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value !== '') {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function setCenturies(century: string) {
    const params = new URLSearchParams(searchParams);

    if (century === 'all') {
      params.delete('centuries');

      return `?${params.toString()}`;
    }

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(e => params.append('centuries', e));

    return `?${params.toString()}`;
  }

  function resetQuery() {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
  }

  function resetAllFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    return `?${params.toString()}`;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={setGenderFilter('all')}
          className={!sex || sex === 'all' ? 'is-active' : ''}
        >
          All
        </Link>
        <Link
          to={setGenderFilter('m')}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </Link>
        <Link
          to={setGenderFilter('f')}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query ?? ''}
            onChange={setQuery}
          />

          <span className="icon is-left" onClick={resetQuery}>
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <Link
                key={c}
                data-cy="century"
                to={setCenturies(c)}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(c),
                })}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={setCenturies('all')}
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={resetAllFilters()}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
