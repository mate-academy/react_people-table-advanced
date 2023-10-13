import React from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { SexFilter } from '../../types/SexFilter';

type Props = {
  query: string;
  changeQuery: (input: string) => void;
  sex: string | null;
  centuries: string[];
};

const sexCollection: SexFilter[] = [
  { id: 0, sex: null, title: 'All' },
  { id: 1, sex: 'm', title: 'Male' },
  { id: 2, sex: 'f', title: 'Female' },
];

const centuryCollection = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  query,
  changeQuery,
  sex,
  centuries,
}) => {
  const changeCentury = (century: string) => (centuries.includes(century)
    ? centuries.filter(currentCentury => currentCentury !== century)
    : [...centuries, century]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexCollection.map(sexItem => (
          <SearchLink
            key={sexItem.id}
            className={cn({
              'is-active': sex === sexItem.sex,
            })}
            params={{ sex: sexItem.sex }}
          >
            {sexItem.title}
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
            {centuryCollection.map(centuryItem => (
              <SearchLink
                key={centuryItem}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(centuryItem),
                })}
                params={{ century: changeCentury(centuryItem) }}
              >
                {centuryItem}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ century: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, century: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
