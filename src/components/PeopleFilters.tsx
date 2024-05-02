import { useCallback, useEffect, useState } from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

// type Props = {
//   nameFilter: string;
//   setNameFilter: React.Dispatch<React.SetStateAction<string>>;
//   searchParams: URLSearchParams;
// };

export const PeopleFilters: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');

  useEffect(() => {
    // If the query is empty
    if (!nameFilter.length) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    } else {
      searchParams.set('query', nameFilter);
      setSearchParams(searchParams);
    }
  }, [nameFilter, searchParams, setSearchParams]);

  const getCenturies = useCallback(
    (century: string) => {
      const centuries = searchParams.getAll('centuries');

      // If the century is selected now
      return centuries.includes(century)
        ? centuries.filter((currentCent: string) => currentCent !== century)
        : [...centuries, century];
    },
    [searchParams],
  );

  // const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => [
  //   const newSearchParams =
  // ]

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
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
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
            value={nameFilter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNameFilter(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map((century: string) => (
              <SearchLink
                params={{ centuries: getCenturies(century) }}
                className={classNames('button', 'mr-1', {
                  'is-info': !getCenturies(century).includes(century),
                })}
                data-cy="century"
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={classNames('button', 'is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
              data-cy="centuryALL"
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
