import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../types/SearchParams';
import { SearchLink } from './SearchLink';

type Props = {
  isLoading: boolean;
};

export const PeopleFilters: React.FC<Props> = ({ isLoading }) => {
  const sexFilters = {
    [SexFilter.ALL]: '',
    [SexFilter.MALE]: 'm',
    [SexFilter.FEMALE]: 'f',
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || SexFilter.ALL;
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  /* function handleSexFilter(filter: SexFilter) {
    if (filter === SexFilter.ALL) {
      setSearchWith({ sex: null });
    } else {
      setSearchWith({ sex: sexFilters[filter] });
    }
  } */

  /* function toggleCentury(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    setSearchWith({ centuries: newCenturies });
  } */

  /* function clearCenturies() {
    setSearchWith({ centuries: null });
  } */

  if (isLoading) {
    return null;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(sexFilters).map(key => {
          const filter = key as SexFilter;

          return (
            <SearchLink
              key={filter}
              params={{
                sex: filter === SexFilter.ALL ? null : sexFilters[filter],
              }}
              className={classNames({
                'is-active': sexFilter === sexFilters[filter],
              })}
            >
              {filter}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
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
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button is-link is-fullwidth', {
            'is-outlined':
              !query || sexFilter === SexFilter.ALL || !centuries.length,
          })}
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
