import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSexParams = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;

    const firstLetter = target.innerText.slice(0, 1).toLowerCase();

    setSearchParams(
      getSearchWith(searchParams, {
        sex: firstLetter === 'a' ? null : firstLetter,
      }),
    );
  };

  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: e.target.value.trim() || null,
      }),
    );
  };

  const handleCenturiesParams = (
    e: React.ChangeEvent<HTMLAnchorElement>,
    cent: number,
  ) => {
    e.preventDefault();

    const centAsString = String(cent);
    const newCenturies = centuries.includes(centAsString)
      ? centuries.filter(century => String(century) !== centAsString)
      : [...centuries, centAsString];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies,
      }),
    );
  };

  const handleClearCenturiesParams = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();

    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(item => (
          <Link
            key={item}
            className={`${sex === '' && item === 'All' ? 'is-active' : sex === 'm' && item === 'Male' ? 'is-active' : sex === 'f' && item === 'Female' ? 'is-active' : null}`}
            to={`?`}
            onClick={handleSexParams}
          >
            {item}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleSearchParams}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={`button mr-1 ${centuries.map(c => (+c === cent ? 'is-info' : '')).join(' ')}`}
                to={`?centuries=${cent}`}
                onClick={e => handleCenturiesParams(e, cent)}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button ${centuries.length === 0 ? 'is-success' : 'is-outlined'}`}
              to="?"
              onClick={handleClearCenturiesParams}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="?"
          onClick={() => getSearchWith(searchParams, {})}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
