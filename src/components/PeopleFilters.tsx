import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParam } from '../types/SearchParam';
import { CENTURY_MAP, FEMALE, MALE } from '../utils/consts';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchParam.Sex);
  const centuries = searchParams.getAll(SearchParam.Centuries);

  useEffect(() => {
    setQuery(searchParams.get(SearchParam.Query) || '');
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
    setQuery(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': !sex },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === MALE },
          )}
          params={{ sex: MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === FEMALE },
          )}
          params={{ sex: FEMALE }}
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
            defaultValue={searchParams.get(SearchParam.Query) || ''}
            onChange={(event) => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_MAP.map((century: number) => {
              const currentCentury = century.toString();
              const isCenturyIncluded = centuries.includes(currentCentury);
              const updatedCenturies = isCenturyIncluded
                ? centuries.filter(cent => cent !== currentCentury)
                : [...centuries, currentCentury];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': isCenturyIncluded },
                  )}
                  params={{
                    centuries: updatedCenturies,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
