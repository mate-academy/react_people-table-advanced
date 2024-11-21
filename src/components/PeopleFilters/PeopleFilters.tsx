import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { SexFilter } from '../../types/SexFilter';
import { SearchLink } from '../SearchLink';
import { centuriesFilters } from '../../constants/centuriesFilters';
import { useFilter } from '../../hooks/useFilter';

export const PeopleFilters = () => {
  const { centuries, sex, nameQuery, updateFilters } = useFilter();

  const sexFilters = Object.values(SexFilter);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilters({ query: event.target.value.trimStart() || null });
  };

  const handleToggleCenturies = (selectedCentury: string) =>
    centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        {sexFilters.map(sexFilter => {
          const preparedSexFilter = sexFilter[0].toLowerCase();

          return (
            <SearchLink
              key={sexFilter}
              className={cn({
                'is-active': preparedSexFilter === sex,
              })}
              params={{ sex: preparedSexFilter }}
            >
              {sexFilter}
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
            value={nameQuery}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesFilters.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: handleToggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success ', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
