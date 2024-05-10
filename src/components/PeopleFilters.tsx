import classNames from 'classnames';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname, search } = useLocation();

  const centuriesArray = ['16', '17', '18', '19', '20'];
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleSexAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');

    setSearchParams(params);
  };

  const handleSex = (sex: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', sex);

    setSearchParams(params);
  };

  const handleCenturie = (ch: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));

    setSearchParams(params);
  };

  const handleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          onClick={handleSexAll}
          className={classNames({
            'is-active': !search.includes('sex=m') && !search.includes('sex=f'),
          })}
          href={`#${pathname}${search}`}
        >
          All
        </a>
        <a
          onClick={() => handleSex('m')}
          className={classNames({ 'is-active': search.includes('sex=m') })}
          href={`#${pathname}${search}`}
        >
          Male
        </a>
        <a
          onClick={() => handleSex('f')}
          className={classNames({ 'is-active': search.includes('sex=f') })}
          href={`#${pathname}${search}`}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuriesArray.map(cent => (
              <a
                key={cent}
                onClick={() => handleCenturie(cent)}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cent),
                })}
                href={`#${pathname}${search}`}
              >
                {cent}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              onClick={handleAllCenturies}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              href={`#${pathname}${search}`}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={handleResetFilters}
          className="button is-link is-outlined is-fullwidth"
          href={`#${pathname}`}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
