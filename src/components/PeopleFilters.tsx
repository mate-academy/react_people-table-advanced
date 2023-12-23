/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../utils/searchHelper';
import { FilterParams } from '../types/FilterParams';
import { CENTURIES } from '../constants/centuries';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(FilterParams.Query) || '';

  const handleChangeQuery = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(
      searchParams,
      { [FilterParams.Query]: e?.target.value || null },
    );

    setSearchParams(search);
  };

  const createCenturySearchString = (century: string | null) => {
    const centuriesParams = searchParams.getAll(FilterParams.Century);

    if (!century) {
      return getSearchWith(searchParams,
        { [FilterParams.Century]: null });
    }

    if (century && centuriesParams.includes(century)) {
      return getSearchWith(
        searchParams,
        { [FilterParams.Century]: centuriesParams.filter(c => c !== century) },
      );
    }

    return getSearchWith(searchParams,
      { [FilterParams.Century]: [...centuriesParams, century] });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn(
            { 'is-active': !searchParams.get(FilterParams.Sex) },
          )}
          to={{
            search: getSearchWith(searchParams, { [FilterParams.Sex]: null }),
          }}
        >
          All
        </Link>
        <Link
          className={cn(
            { 'is-active': searchParams.get(FilterParams.Sex) === 'm' },
          )}
          to={{
            search: getSearchWith(searchParams, { [FilterParams.Sex]: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={cn(
            { 'is-active': searchParams.get(FilterParams.Sex) === 'f' },
          )}
          to={{
            search: getSearchWith(searchParams, { [FilterParams.Sex]: 'f' }),
          }}
        >
          Female
        </Link>
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
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => handleChangeQuery()}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              CENTURIES.map(century => (
                <Link
                  key={century}
                  data-cy="century"
                  className={cn(
                    'button mr-1',
                    {
                      'is-info': searchParams
                        .getAll(FilterParams.Century)
                        .includes(century),
                    },
                  )}
                  to={{
                    search: createCenturySearchString(century),
                  }}
                >
                  {century}
                </Link>
              ))
            }
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                {
                  'is-outlined': !!searchParams
                    .getAll(FilterParams.Century).length,
                },
              )}
              to={{
                search: createCenturySearchString(null),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
