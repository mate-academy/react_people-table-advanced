import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || 'all';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const toggleCentury = (century: string) => {
    const updatedCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    setSearchWith({
      centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
    });
  };

  const toggleSex = (e: React.MouseEvent, s: string) => {
    e.preventDefault();
    setSearchWith({
      sex: s.toLowerCase() === 'all' ? null : s.toLowerCase(),
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(s => (
          <a
            key={s}
            href="#"
            className={classNames({
              'is-active': sex === s.toLowerCase(),
            })}
            onClick={e => toggleSex(e, s)}
          >
            {s}
          </a>
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
            onChange={e => handleSearch(e)}
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
                href="#"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                onClick={e => {
                  e.preventDefault();
                  toggleCentury(century.toString());
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
              href="#"
              onClick={e => {
                e.preventDefault();
                setSearchWith({ centuries: null });
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
            setSearchParams('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
