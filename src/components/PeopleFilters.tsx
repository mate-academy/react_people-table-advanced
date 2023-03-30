import classNames from 'classnames';
import { ChangeEvent, FC } from 'react';
import { SearchLink } from './SearchLink';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PeopleFilters: FC<Props> = ({
  query,
  sex,
  centuries,
  onQueryChange,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames(
            { 'is-active': !sex },
          )}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames(
            { 'is-active': !sex },
          )}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames(
            { 'is-active': !sex },
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => {
              const isAlreadyIn = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: isAlreadyIn
                      ? centuries.filter(cen => cen !== century)
                      : [...centuries, century],
                  }}
                  className={classNames(
                    'button mr-1',
                    { 'is-info': isAlreadyIn },
                  )}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              params={{
                centuries: [],
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames(
            'button is-link is-fullwidth',
            { 'is-outlined': sex || query || centuries.length > 0 },
          )}
          params={{
            sex: null,
            centuries: [],
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
