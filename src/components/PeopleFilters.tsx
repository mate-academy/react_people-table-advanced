import { Link } from 'react-router-dom';
import { Gender } from '../types/Gender';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { memo } from 'react';

type PeopleFiltersProps = {
  query: string;
  selectedGender: string;
  selectedCenturies: string[];
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CENTURY_FILTER_VALUES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = memo(
  ({
    query,
    handleQueryChange,
    selectedGender,
    selectedCenturies,
  }: PeopleFiltersProps) => {
    const isAllCenturiesSelected = selectedCenturies.length === 0;

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {Object.entries(Gender).map(([key, value]) => {
            const isActive =
              (value === Gender.All && !selectedGender) ||
              value === selectedGender;

            return (
              <SearchLink
                key={key}
                params={{ sex: value === '' ? null : value }}
                className={cn({ 'is-active': isActive })}
              >
                {key}
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
              value={query}
              onChange={handleQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {CENTURY_FILTER_VALUES.map(century => {
                const isActive = selectedCenturies.includes(century);

                const newSelectedCentury = isActive
                  ? selectedCenturies.filter(selected => selected !== century)
                  : [...selectedCenturies, century];

                const params = {
                  centuries:
                    newSelectedCentury.length > 0 ? newSelectedCentury : null,
                };

                return (
                  <SearchLink
                    key={century}
                    params={params}
                    data-cy="century"
                    className={cn('button mr-1', { 'is-info': isActive })}
                  >
                    {century}
                  </SearchLink>
                );
              })}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{ centuries: null }}
                data-cy="centuryALL"
                className={cn({
                  'button is-success': isAllCenturiesSelected,
                  'button is-outlined': !isAllCenturiesSelected,
                })}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            className="button is-link is-outlined is-fullwidth"
            to="/people"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    );
  },
);

PeopleFilters.displayName = 'PeopleFilters';
