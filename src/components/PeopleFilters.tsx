import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import {
  CENTURIES,
  EMPTY_STRING,
  SEX_FEMALE,
  SEX_MALE,
} from '../utils/constants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim() || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': searchParams.get('sex') === EMPTY_STRING,
          })}
          params={{ sex: EMPTY_STRING }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': searchParams.get('sex') === SEX_MALE,
          })}
          params={{ sex: SEX_MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': searchParams.get('sex') === SEX_FEMALE,
          })}
          params={{ sex: SEX_FEMALE }}
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
            {CENTURIES.map((century) => {
              const newCenturies = centuries.includes(century)
                ? centuries.filter(epoch => epoch !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: newCenturies }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
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
          params={{ sex: null, centuries: [], query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
