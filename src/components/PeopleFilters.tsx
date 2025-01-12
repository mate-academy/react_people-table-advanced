import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
};
export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.length !== 0) {
      params.set('query', event.target.value);
      setSearchParams(params);
    }

    if (event.target.value.length === 0) {
      params.delete('query');
      setSearchParams(params);
    }
  }

  function addSex(sexSelect: string) {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    if (sexSelect !== 'all') {
      params.append('sex', sexSelect);
    }

    setSearchParams(params);
  }

  function addCenturies(centur: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(centur)
      ? centuries.filter(years => years !== centur)
      : [...centuries, centur];

    params.delete('centuries');
    newCenturies.forEach(years => params.append('centuries', years));
    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sex })}
          onClick={() => addSex('all')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => addSex('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={() => addSex('f')}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(centur => (
              <a
                key={centur}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${centur}`),
                })}
                onClick={() => addCenturies(`${centur}`)}
              >
                {centur}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
