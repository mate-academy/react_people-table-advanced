import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import {
  FILTER_CENTURIES,
  FILTER_SEX,
  FILTER_KEYS,
} from '../../constants/constants';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(FILTER_KEYS.QUERY) || '';
  const sex = searchParams.get(FILTER_KEYS.SEX);
  const centuries = searchParams.getAll(FILTER_KEYS.CENTURIES);

  const updateSearchParams = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(FILTER_SEX).map(sexFilter => {
          const sexValue = sexFilter.charAt(0);
          const filterTitle =
            sexFilter.charAt(0).toUpperCase() + sexFilter.slice(1);

          return (
            <SearchLink
              key={sexFilter}
              params={{
                [FILTER_KEYS.SEX]: sexFilter === 'all' ? null : sexValue,
              }}
              className={cn({
                'is-active':
                  sex === sexValue || (sex === null && sexFilter === 'all'),
              })}
            >
              {filterTitle}
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
            placeholder="Search by name"
            value={query}
            onChange={event =>
              updateSearchParams({
                [FILTER_KEYS.QUERY]: event.target.value || null,
              })
            }
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {FILTER_CENTURIES.map(century => {
              const currentCenturies = centuries.includes(century)
                ? centuries.filter(current => current !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  params={{ [FILTER_KEYS.CENTURIES]: currentCenturies }}
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  data-cy="century"
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ [FILTER_KEYS.CENTURIES]: null }}
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            [FILTER_KEYS.QUERY]: null,
            [FILTER_KEYS.SEX]: null,
            [FILTER_KEYS.CENTURIES]: null,
          }}
          className="button is-link is-outlined is-fullwidth"
          data-cy="resetFilters"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
