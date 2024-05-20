import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  getSex: string | null;
  query: string;
  centuries: string[];
}

export const PeopleFilters = ({ getSex, query, centuries }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: Record<string, string | null>) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !getSex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': getSex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': getSex === 'f' })}
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
            value={query}
            onChange={event => handleQueryChange(event)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(value => (
              <Link
                data-cy="century"
                key={value}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(value.toString()),
                })}
                to={{
                  /* eslint-disable @typescript-eslint/indent */
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(value.toString())
                      ? centuries.filter(
                          centurie => centurie !== value.toString(),
                        )
                      : [...centuries, value.toString()],
                  }),
                  /* eslint-enable @typescript-eslint/indent */
                }}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
