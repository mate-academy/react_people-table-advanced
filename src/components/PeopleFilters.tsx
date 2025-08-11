import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './index';
import { getSearchWith } from '../utils';
import { SexFilters } from '../types';
import { CENTURIES } from '../constants/centuries';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const getCenturiesParams = (century: string) => {
    const isSelected = centuries.includes(century);

    return {
      centuries: isSelected
        ? centuries.filter(centuryItem => centuryItem !== century)
        : [...centuries, century],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilters).map(sexFilter => {
          const param = sexFilter === 'All' ? null : sexFilter[0].toLowerCase();

          return (
            <SearchLink
              params={{ sex: param }}
              className={cn({ 'is-active': sex === param })}
              key={sexFilter}
            >
              {sexFilter}
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
            onChange={event =>
              setSearchParams(current =>
                getSearchWith(current, {
                  query: event.target.value.trimStart() || null,
                }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              return (
                <SearchLink
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={getCenturiesParams(century)}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: [] }}
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
              query: null,
              centuries: [],
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
