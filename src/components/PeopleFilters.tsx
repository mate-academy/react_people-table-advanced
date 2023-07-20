import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const enum Sex {
  M = 'm',
  F = 'f',
}

const visibleCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') ?? '';
  const query = searchParams.get('query') ?? '';
  const centuries = searchParams.getAll('centuries') ?? [];

  const handlerQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (newQuery === '') {
      setSearchParams(
        getSearchWith(searchParams, { query: null }),
      );

      return;
    }

    setSearchParams(
      getSearchWith(searchParams, { query: newQuery }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === Sex.M })}
          params={{ sex: Sex.M }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === Sex.F })}
          params={{ sex: Sex.F }}
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
            value={query}
            onChange={handlerQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {visibleCenturies.map(age => (
              <SearchLink
                key={age}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(age) },
                )}
                params={{
                  centuries: centuries.includes(age)
                    ? centuries.filter(c => c !== age)
                    : [...centuries, age],
                }}
              >
                {age}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-success': centuries.length === visibleCenturies.length },
                // 'is-outlined',
              )}
              params={{
                centuries: centuries.length === visibleCenturies.length
                  ? null
                  : visibleCenturies,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
