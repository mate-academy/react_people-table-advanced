import classNames from 'classnames';
import React, { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const PeopleFilters: FC<Props> = ({ query, setQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  setQuery(searchParams.get('query') || '');

  function getSearchWith(params: { [key: string]: string[] | string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach((part) => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    return searchParams.toString();
  }

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith({ query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event)}
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map((centurie) => (
              <Link
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(centurie)
                      ? centuries.filter((c) => c !== centurie)
                      : [...centuries, centurie],
                  }),
                }}
                data-cy="century"
                className={classNames('button mr-1 ', {
                  'is-info': centuries.includes(centurie),
                })}
                // href={`/people?centuries=${centurie}`}
              >
                {Number(centurie)}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith({ centuries: null }) }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
              // href="#/people"
            >
              All
            </Link>
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
