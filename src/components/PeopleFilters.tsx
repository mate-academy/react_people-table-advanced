// import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { setSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const [queryFilter, setQueryFilter] = useState(query);

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const handleSetQueryParams = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQueryFilter(event.target.value);
    const queryNormalized = event.target.value.trim().toLowerCase();

    setSearchWith(
      searchParams,
      { query: queryNormalized || null },
      setSearchParams,
    );
  };

  function getNewCenturies(century: string) {
    if (centuries.includes(century)) {
      return centuries.filter(paramsCentury => paramsCentury !== century);
    }

    return [...centuries, century];
  }

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            params={{ sex: null }}
            className={classNames({ 'is-active': sex === '' })}
          >
            All
          </SearchLink>

          <SearchLink
            params={{ sex: 'm' }}
            className={classNames({ 'is-active': sex === 'm' })}
          >
            Male
          </SearchLink>

          <SearchLink
            params={{ sex: 'f' }}
            className={classNames({ 'is-active': sex === 'f' })}
          >
            Female
          </SearchLink>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              onChange={handleSetQueryParams}
              value={queryFilter}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            {CENTURIES.map(century => (
              <div className="level-left" key={century}>
                <SearchLink
                  data-cy="century"
                  params={{ centuries: getNewCenturies(century) }}
                  className={classNames('button mr-1',
                    {
                      'is-info': centuries.includes(century),
                    })}
                >
                  {century}
                </SearchLink>
              </div>
            ))}

            <div className="level-right ml-4">
              <a
                data-cy="centuryALL"
                className={classNames('button is-success',
                  { 'is-outlined': centuries.length })}
                href="#/people"
              >
                All
              </a>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            className="button is-link is-outlined is-fullwidth"
            params={{ sex: null, centuries: null, query: null }}
            onClick={() => setQueryFilter('')}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
