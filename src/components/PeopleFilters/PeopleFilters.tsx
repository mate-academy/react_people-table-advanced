import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { useState } from 'react';
import { SexFilters } from '../../types/SexFilters';

const centuriesCollection = ['17', '18', '19', '20'];

type Props = {
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCentury: (century: string) => void;
  query: string;
  centuriesQuery: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  handleQueryChange,
  toggleCentury,
  query,
  centuriesQuery,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SexFilters.map(filterType => (
          <SearchLink
            className={classNames({
              'is-active': selectedFilter === filterType.name,
            })}
            key={filterType.name}
            params={{ sex: filterType.sex }}
            onClick={() => setSelectedFilter(filterType.name)}
          >
            {filterType.name}
          </SearchLink>
        ))}
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
            {centuriesCollection.map(centuryItem => (
              <SearchLink
                key={centuryItem}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesQuery.includes(centuryItem),
                })}
                params={{ centuries: [centuryItem.toString()] }}
                onClick={e => {
                  e.preventDefault();
                  toggleCentury(centuryItem);
                }}
              >
                {centuryItem}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1 is-success', {
                'is-outlined': centuriesQuery.length,
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
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
