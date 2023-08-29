import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = [...searchParams.getAll('centuries')];

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(
      searchParams,
      { query: event.target.value.trim() || null },
    );

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': currentQuery.trim() === '' && !currentSex,
          })}
          params={{ sex: '' }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currentSex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currentSex === 'f' })}
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
            value={currentQuery}
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(year => year !== century)
                  : [...centuries, century],
              }}
              className={cn(
                'button mr-1',
                { 'is-info': centuries.includes(century) },
              )}
            >
              {century}
            </SearchLink>
          ))}

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
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
          className="button is-link is-outlined is-fullwidth"
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
