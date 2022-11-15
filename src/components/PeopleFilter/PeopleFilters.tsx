import classNames from 'classnames';
import {
  FC, useCallback, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { centuryValues } from '../../constants/centuryValues';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const isAllActive = useMemo(() => centuries.length > 0, [centuries]);
  const isMale = useMemo(() => sex === 'm', [sex]);
  const isFemale = useMemo(() => sex === 'f', [sex]);

  const handleSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue: string | null = event.target.value;

      if (!inputValue) {
        inputValue = null;
      }

      const newParams = getSearchWith(searchParams, { query: inputValue });

      setSearchParams(newParams);
    }, [searchParams, query],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={classNames(
            { 'is-active': !sex },
          )}
        >
          All
        </SearchLink>

        <SearchLink
          params={{
            sex: 'm',
          }}
          className={classNames(
            { 'is-active': isMale },
          )}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{
            sex: 'f',
          }}
          className={classNames(
            { 'is-active': isFemale },
          )}
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
            onChange={handleSearchInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryValues.map(century => {
              const isActive = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  params={{
                    century: isActive
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': isActive },
                  )}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                century: null,
              }}
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': isAllActive },
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
            century: null,
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
