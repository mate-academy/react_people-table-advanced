import { useCallback, useMemo, useState } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  const [query, setQuery] = useState('');

  const centuriesNumbers = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(curentCentury => curentCentury !== century)
      : [...centuries, century];
  };

  const handlQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);

      const params = new URLSearchParams(searchParams);

      params.set('query', event.target.value);

      if (!event.target.value) {
        params.delete('query');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
          params={{
            sex: 'f',
          }}
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
            onChange={handlQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={
                centuries.includes('16') ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries: centuriesNumbers('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('17') ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries: centuriesNumbers('17'),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('18') ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries: centuriesNumbers('18'),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('19') ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries: centuriesNumbers('19'),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('20') ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries: centuriesNumbers('20'),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
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
