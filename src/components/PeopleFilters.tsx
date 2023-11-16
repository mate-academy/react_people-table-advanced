import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { UrlSearchParams } from '../types/UrlSearchParams';

const initialCenturies = ['16', '17', '18', '19', '20'];

const emptyParams = {
  sex: null,
  query: null,
  centuries: null,
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(UrlSearchParams.QUERY) || '';
  const centuriesFromUrl = searchParams.getAll(UrlSearchParams.CENTURIES) || [];

  const handleQueryChange = (newQuery: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (!newQuery.trim()) {
      updatedSearchParams.delete(UrlSearchParams.QUERY);
    } else {
      updatedSearchParams.set(UrlSearchParams.QUERY, newQuery.trim());
    }

    setSearchParams(updatedSearchParams.toString());
  };

  const handleBtnCenturyClick = (century: string) => {
    return centuriesFromUrl.includes(century)
      ? centuriesFromUrl.filter(currentCentury => currentCentury !== century)
      : [...centuriesFromUrl, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !searchParams.get(UrlSearchParams.SEX)
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': searchParams.get(UrlSearchParams.SEX) === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': searchParams.get(UrlSearchParams.SEX) === 'f',
          })}
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
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {initialCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuriesFromUrl.includes(century),
                })}
                params={{ centuries: handleBtnCenturyClick(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                {
                  'is-outlined': centuriesFromUrl.length,
                },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames(
            'button',
            'is-link',
            'is-outlined',
            'is-fullwidth',
          )}
          params={emptyParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
