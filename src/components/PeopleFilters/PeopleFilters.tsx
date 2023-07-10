import { ChangeEvent, FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';
import { centuriesItems, sexOptions } from '../../utils/constants';

export const PeopleFilters: FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedSearch = getSearchWith(
      searchParams, { query: event.target.value || null },
    );

    setSearchParams(updatedSearch);
  };

  const changeCenturyParams = (century: string) => ({
    centuries: centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century],
  });

  const resetCenturyParams = () => ({
    centuries: null,
  });

  const resetAllParams = () => ({
    query: null,
    sex: null,
    centuries: null,
  });

  const searchLinkAllClasses = classNames('button is-success', {
    'is-outlined': centuries.length !== 0,
  });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map((item) => {
          const searchSexLinkClasses = classNames(
            { 'is-active': sex === item.sex },
          );

          return (
            <SearchLink
              key={item.sex}
              params={{ sex: item.sex || null }}
              className={searchSexLinkClasses}
            >
              {item.label}
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
            {centuriesItems.map((century) => {
              const searchLinkItemClasses = classNames('button mr-1', {
                'is-info': centuries.includes(century.toString()),
              });

              return (
                <SearchLink
                  key={century}
                  params={changeCenturyParams(century)}
                  data-cy="century"
                  className={searchLinkItemClasses}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={resetCenturyParams()}
              data-cy="centuryALL"
              className={searchLinkAllClasses}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetAllParams()}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
