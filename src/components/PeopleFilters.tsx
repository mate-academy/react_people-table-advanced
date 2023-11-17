import cn from 'classnames';
// import { useEffect } from 'react';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

type Props = {
  sex: string;
  centuries: string[];
  preparedPeople: Person[];
  setPreparedPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  getpeople: Person[];
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  centuries,
  // preparedPeople,
  // setPreparedPeople,
  // getpeople,
}) => {
  const arrCenturies = [16, 17, 18, 19, 20];
  const handleCenturiesChange = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  const handleFilterSex = (filter: string) => {
    const sexFilter = { sex: filter };

    return sexFilter;
  };

  const sexFilters = ['Male', 'Female'];

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
        {sexFilters.map((item) => (
          <SearchLink
            className={cn({ 'is-active': sex === item[0].toLowerCase() })}
            params={handleFilterSex(`${(item[0].toLowerCase())}`)}
          >
            {item}
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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {arrCenturies.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{ centuries: handleCenturiesChange(`${century}`) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{
                centuries: null,
              }}
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
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
