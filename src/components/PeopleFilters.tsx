import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterCenturies, filterSex } from '../utils/helpers';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  query: string,
  filterBySex: string | null,
  centuriesOption: string[],
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  filterBySex,
  centuriesOption,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, { query: event.target.value });

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filterSex.map((
          { title, sex },
        ) => (
          <SearchLink
            key={title}
            params={{ sex }}
            className={classNames({
              'is-active': filterBySex === sex,
            })}
          >
            {title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', ({
                  'is-info': centuriesOption.includes(century),
                }))}
                params={{
                  centuries: centuriesOption.includes(century)
                    ? centuriesOption.filter(c => c !== century)
                    : [...centuriesOption, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesOption.length !== 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
