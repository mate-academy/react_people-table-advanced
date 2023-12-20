import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

// interface PeopleFiltersType {
//   setPeople: Dispatch<SetStateAction<Person[]>>;
//   peopleMain: Person[];
//   people: Person[];
// }

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState('');

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  const handleCenturies = (value: string) => {
    if (centuries.includes(value)) {
      return { centuries: centuries.filter(year => year !== value) };
    }

    return { centuries: [value, ...centuries] };
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);

    if (event.target.value === '') {
      setSearchParams(getSearchWith(searchParams, { query: null }));

      return;
    }

    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex?.includes('m') && !sex?.includes('f'),
          })}
          params={{ sex: null }}
        // to="#/people"
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex?.includes('m') })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex?.includes('f') })}
          params={{ sex: 'f' }}
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
            value={inputSearch}
            onChange={(event) => handleInputSearch(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              // to="#/people?centuries=16"
              params={handleCenturies('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              // to="#/people?centuries=17"
              params={handleCenturies('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              // to="#/people?centuries=18"
              params={handleCenturies('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              // to="#/people?centuries=19"
              params={handleCenturies('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              // to="#/people?centuries=20"
              params={handleCenturies('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !['16', '17', '18', '19', '20']
                  .every(century => !centuries.includes(century)),
              })}
              // to="#/people"
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
          // to="#/people"
          params={{ centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
