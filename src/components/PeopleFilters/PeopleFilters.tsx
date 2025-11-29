import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

type PersonSexFilterType = 'a' | 'm' | 'f';

const personSexOptions: { title: string; value: PersonSexFilterType }[] = [
  { title: 'All', value: 'a' },
  { title: 'Male', value: 'm' },
  { title: 'Female', value: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = (searchParams.get('sex') as PersonSexFilterType) || 'a';

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const handleToggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(ct => ct !== century)
      : [...centuries, century];
  };

  const handleSelectSex = (value: PersonSexFilterType) => {
    if (value === 'a') {
      return null;
    }

    return value;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {personSexOptions.map(ps => (
          <SearchLink
            key={ps.title}
            params={{ sex: handleSelectSex(ps.value) }}
            className={classNames({
              'is-active': ps.value === sex,
            })}
          >
            {ps.title}
          </SearchLink>
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
            onChange={handleChangeQuery}
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
              <SearchLink
                params={{ centuries: handleToggleCentury(cent.toString()) }}
                key={cent}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cent.toString()),
                })}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
