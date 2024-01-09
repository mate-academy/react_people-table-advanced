import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { GenderSorting, genderHeader } from '../constants/GenderSorting';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || GenderSorting.All;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const getCenturySearch = (value: string) => {
    const newCenturies = centuries.includes(value)
      ? centuries.filter(century => century !== value)
      : [...centuries, value];

    return getSearchWith(searchParams, { centuries: newCenturies });
  };

  const handleSetFilter = (value: string) => {
    if (value) {
      return {
        sex: value,
      };
    }

    return {
      sex: null,
    };
  };

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      query: e.target.value || null,
    }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(genderHeader).map(({ key, title }) => {
          return (
            <SearchLink
              params={handleSetFilter(key)}
              className={sex === key ? 'is-active' : ''}
            >
              {title}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleSetQuery}
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
              <Link
                key={century}
                to={{
                  search: getCenturySearch(String(century)),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(String(century)),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
