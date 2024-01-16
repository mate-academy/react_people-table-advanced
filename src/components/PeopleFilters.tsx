import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const CENTURIES_VALUE: number[] = [16, 17, 18, 19, 20];
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const q = searchParams.get('query');

  const isCenturyActive = (el: number) => {
    if (!centuries?.includes(String(el))) {
      return { centuries: [...centuries, String(el)] };
    }

    return {
      centuries: centuries.filter(e => (
        e !== String(el))),
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    searchParams.set('query', value);

    if (value === '') {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            value={q || query}
            onChange={(event) => handleChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_VALUE.map(el => (
              <SearchLink
                key={el}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(String(el)),
                })}
                params={isCenturyActive(el)}
              >
                {el}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null, centuries: null, query: null, sort: null,
          }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
