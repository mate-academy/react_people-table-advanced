import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchField } from '../utils/SearchFiled';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';
import { CENTURY_LIST } from '../utils/constants';

export const PeopleFilters = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchField.Sex);
  const centuries = searchParams.getAll(SearchField.Centuries);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
    setQuery(event.target.value);
  };

  const generateCenturyLinkParams = (
    isCenturyIncluded: boolean,
    century: string,
    currentCenturies: string[],
  ) => {
    return {
      centuries: isCenturyIncluded
        ? currentCenturies.filter(centur => centur !== century)
        : [...currentCenturies, century],
    };
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
            { 'is-active': sex === Sex.Male },
          )}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === Sex.Female },
          )}
          params={{ sex: Sex.Female }}
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
            {CENTURY_LIST.map((century: string) => {
              const isCenturyIncluded = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': isCenturyIncluded },
                  )}
                  params={generateCenturyLinkParams(
                    isCenturyIncluded,
                    century,
                    centuries,
                  )}
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
          onClick={() => {
            setQuery('');
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
