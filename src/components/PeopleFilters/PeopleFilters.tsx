import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SexSearchLink } from '../SexSearchLink';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: React.FC = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesList = ['16', '17', '18', '19', '20'];

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const preparedSearchWith = getSearchWith(
      searchParams,
      { query: value.trimStart() || null },
    );

    setSearchParams(preparedSearchWith);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexSearchLink sex={null} text="All" currentSex={sex} />
        <SexSearchLink sex="m" text="Male" currentSex={sex} />
        <SexSearchLink sex="f" text="Female" currentSex={sex} />
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeName}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => {
              const isIncludedCentury = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: isIncludedCentury
                      ? centuries.filter(item => item !== century)
                      : [...centuries, century],
                  }}
                  className={cn(
                    'button',
                    'mr-1',
                    { 'is-info': isIncludedCentury },
                  )}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
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
            centuries: [],
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
