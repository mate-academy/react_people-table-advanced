import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import cn from 'classnames';

import { centuries } from '../constants/centuries';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFronParams = searchParams.get('sex');
  const centuriesFromParams = searchParams.getAll('century');
  const queryFromParams = searchParams.get('query') || '';

  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }

  function handleChangeCenturies(century: string) {
    const currentCenturies = centuriesFromParams;

    return currentCenturies.includes(century)
      ? currentCenturies.filter(currCentury => currCentury !== century)
      : [...currentCenturies, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sexFronParams ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={sexFronParams === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={sexFronParams === 'f' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            value={queryFromParams}
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                params={{ century: handleChangeCenturies(century) }}
                className={cn('button mr-1', {
                  'is-info': centuriesFromParams?.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesFromParams.length,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              century: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
