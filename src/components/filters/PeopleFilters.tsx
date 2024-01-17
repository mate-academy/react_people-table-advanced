import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import { SexType } from '../../types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const centuryFilters = ['16', '17', '18', '19', '20'];

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  }

  const handleToggleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        {(Object.keys(SexType) as (keyof typeof SexType)[])
          .map((key) => (
            <SearchLink
              params={{ sex: SexType[key] }}
              key={SexType[key]}
              className={classNames({ 'is-active': sex === SexType[key] })}
            >
              {`${key.charAt(0) + key.slice(1).toLowerCase()}`}
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
            onChange={handleChangeInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilters.map((century: string) => (
              <SearchLink
                params={{ centuries: handleToggleCenturies(century) }}
                key={century}
                data-cy="century"
                className={classNames(
                  { 'is-info': centuries.includes(century) },
                  'button',
                  'mr-1',
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
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
