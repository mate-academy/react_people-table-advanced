import { ChangeEvent, useState } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const ageParams = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const ages = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || null;

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serch = getSearchWith(searchParams, {
      query: e.target.value || null,
    });

    setSearchParams(serch);
    setQuery(e.target.value);
  };

  const addAge = (age: string) => {
    return ages.includes(age)
      ? ages.filter(currAge => currAge !== age)
      : [...ages, age];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
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
            {ageParams.map(age => (
              <SearchLink
                key={age}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': ages.includes(age),
                })}
                params={{ centuries: addAge(age) }}
              >
                {age}
              </SearchLink>
            ))}
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
          params={{ sex: null, centuries: null, query: null }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
