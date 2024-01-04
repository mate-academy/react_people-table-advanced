import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchFilter, SearchGenders } from '../types';

const CENTURIES_ALL = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchFilter.query) || '';
  const sex = searchParams.get(SearchFilter.sex) || '';
  const centuries = searchParams.getAll(SearchFilter.century) || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set(SearchFilter.query, event.target.value);
    } else {
      params.delete(SearchFilter.query);
    }

    setSearchParams(params);
  };

  const toggleCenturies = (centuryValue: string) => {
    return centuries.includes(centuryValue)
      ? centuries.filter(century => century !== centuryValue)
      : [...centuries, centuryValue];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': sex === '',
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: SearchGenders.man }}
          className={classNames({
            'is-active': sex === SearchGenders.man,
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: SearchGenders.women }}
          className={classNames({
            'is-active': sex === SearchGenders.women,
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
            placeholder="Search"
            value={query}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_ALL.map(centuryItem => (
              <SearchLink
                key={centuryItem}
                params={{ century: toggleCenturies(centuryItem) }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(centuryItem),
                })}
              >
                {centuryItem}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ century: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
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
            query: null,
            sex: null,
            century: null,
          }}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': query || sex || centuries.length,
          })}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
