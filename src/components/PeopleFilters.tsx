import classNames from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Filter } from '../types';

const ALL_CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(Filter.SEX) || '';
  const query = searchParams.get(Filter.QUERY) || '';
  const centuries = searchParams.getAll(Filter.CENTURIES) || [];

  function setSearchWith(params: SearchParams) {
    const newParams = getSearchWith(searchParams, params);

    setSearchParams(newParams);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function toggleCentury(century: string) {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            value={query}
            onChange={handleQueryChange}
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

            {ALL_CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{ centuries: toggleCentury(century) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: null }}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': sex || query || centuries,
          })}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
