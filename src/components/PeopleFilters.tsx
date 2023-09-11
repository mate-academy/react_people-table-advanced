import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sex: string,
  query: string,
  centuries: string[],
};

const centuriesArr = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams,
      { query: event.target.value || null });

    setSearchParams(search);
  };

  const toggleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.All,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.male,
          })}
          params={{ sex: SexFilter.male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.female,
          })}
          params={{ sex: SexFilter.female }}
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
            {centuriesArr.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-fullwidth is-outlined"
          params={{
            sex: null, query: null, centuries: null, sort: null, order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
