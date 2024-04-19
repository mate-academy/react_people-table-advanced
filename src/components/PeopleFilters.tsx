import { useRef } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { Gender } from '../enums/Filter';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const searchInputRef = useRef<HTMLInputElement>(null);
  const allCenturies = ['16', '17', '18', '19', '20'];
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search: string = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSexFilterClick = () => {
    setSearchWith({ sex: sexFilter || null });
    searchParams.set('sex', sexFilter);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
    searchParams.set('query', event.target.value);
  };

  const resetAllFilter = () => {
    setSearchParams('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexFilter })}
          params={{ sex: '' }}
          onClick={handleSexFilterClick}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexFilter === Gender.Male })}
          params={{ sex: Gender.Male }}
          onClick={handleSexFilterClick}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexFilter === Gender.Female })}
          params={{ sex: Gender.Female }}
          onClick={handleSexFilterClick}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            ref={searchInputRef}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{
                  centuries: centuries.includes(`${century}`)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={resetAllFilter}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
