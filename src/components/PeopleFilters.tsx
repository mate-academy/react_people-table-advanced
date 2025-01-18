import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchWith({ query: event.target.value.trim().toLowerCase() || null });
  };

  const setSearchByCentury = (century: string) => {
    const centuries = searchParams.getAll('century');
    const newParams: SearchParams = {
      century: [],
    };

    if (centuries.includes(century)) {
      newParams.century = [...centuries].filter(c => c !== century);
    } else {
      newParams.century = [...centuries, century];
    }

    return newParams;
  };

  const isResetActive = searchParams.values().every(value => value === null);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
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
            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': searchParams.getAll('century').includes('16'),
              })}
              params={setSearchByCentury('16')}
            >
              16
            </SearchLink>

            <SearchLink
              className={classNames('button', 'mr-1', {
                'is-info': searchParams.getAll('century').includes('17'),
              })}
              params={setSearchByCentury('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': searchParams.getAll('century').includes('18'),
              })}
              params={setSearchByCentury('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': searchParams.getAll('century').includes('19'),
              })}
              params={setSearchByCentury('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': searchParams.getAll('century').includes('20'),
              })}
              params={setSearchByCentury('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('century') === null,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames(
            'button',
            'is-link',
            'is-outlined',
            'is-fullwidth',
            {
              'is-success': isResetActive,
            },
          )}
          params={{
            name: null,
            sex: null,
            century: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
