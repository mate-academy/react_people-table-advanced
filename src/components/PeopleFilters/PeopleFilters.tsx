import { ChangeEvent, FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const selectedSex = searchParams.get('sex');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedSearchParams = getSearchWith(
      searchParams,
      { query: event.target.value || null },
    );

    setSearchParams(updatedSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': selectedSex === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': selectedSex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': selectedSex === 'f' })}
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
            onChange={inputHandler}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                data-cy="century"
                params={{
                  centuries: selectedCenturies.includes(century)
                    ? selectedCenturies.filter(c => c !== century)
                    : [...selectedCenturies, century],
                }}
                className={cn('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-outlined', {
                'is-success': selectedCenturies.length,
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
            centuries: [],
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
