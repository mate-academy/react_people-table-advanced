/* eslint-disable @typescript-eslint/indent */
import { FC } from 'react';
import { CENTURIES_FILTER } from '../constants/centuries';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SEX_FILTERS } from '../constants/sexFilter';

interface PeopleFiltersProps {
  updateQuery: (query: string) => void;
}

export const PeopleFilters: FC<PeopleFiltersProps> = ({ updateQuery }) => {
  const [searchParams] = useSearchParams();
  const existingCenturies = searchParams.getAll('centuries') || [];
  const activeSex = searchParams.getAll('sex') || '';
  const query = searchParams.get('query')?.toString();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX_FILTERS).map(([name, value]) => (
          <SearchLink
            key={name}
            params={{ sex: value }}
            className={classNames({
              'is-active':
                activeSex.includes(value || '') ||
                (name === 'All' && activeSex.length === 0),
            })}
          >
            {name}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => updateQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_FILTER.map(century => {
              const updatedCenturies = existingCenturies.includes(century)
                ? existingCenturies.filter(
                    filteredCentury => filteredCentury !== century,
                  )
                : [...existingCenturies, century];

              return (
                <SearchLink
                  key={century}
                  params={{ centuries: updatedCenturies }}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': existingCenturies.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': existingCenturies.length,
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
          params={{ centuries: null, sex: null, query: '' }}
          onClick={() => updateQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
