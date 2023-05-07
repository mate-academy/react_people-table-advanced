import classNames from 'classnames';
import { ChangeEventHandler } from 'react';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

interface Props {
  sex: string;
  centuries: string[];
  query: string;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
}

export const PeopleFilters: React.FC<Props> = ({
  sex,
  centuries,
  query,
  onQueryChange,
}) => {
  const getCenturies = (century: string) => {
    const doesCenturyExist = centuries.includes(century);

    if (doesCenturyExist) {
      return centuries.filter((currentCentury) => currentCentury !== century);
    }

    return [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            {CENTURIES.map((century) => (
              <SearchLink
                params={{
                  centuries: getCenturies(century),
                }}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
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
          params={{ centuries: null, sex: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
