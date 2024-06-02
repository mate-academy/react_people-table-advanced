import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils';
import cn from 'classnames';
import { PeopleFilterParams } from '../types';

const centuriesData = [16, 17, 18, 19, 20];
const sexFilterTabs = [
  ['All', ''],
  ['Male', 'm'],
  ['Female', 'f'],
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll(PeopleFilterParams.Centuries) || [];
  const query = searchParams.get(PeopleFilterParams.Query) || '';
  const sex = searchParams.get(PeopleFilterParams.Sex) || '';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterTabs.map(tab => {
          const [tabName, tabValue] = tab;

          return (
            <Link
              key={tabName}
              className={cn({ 'is-active': sex === tabValue })}
              to={{
                search: getSearchWith(searchParams, {
                  sex: tabValue ? tabValue : null,
                }),
              }}
            >
              {tabName}
            </Link>
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
            onChange={evt => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: evt.target.value || null,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesData.map(century => {
              const centuryStr = century.toString();
              const isActive = centuries.includes(centuryStr);

              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': isActive,
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: isActive
                        ? centuries.filter(c => c !== centuryStr)
                        : [...centuries, centuryStr],
                    }),
                  }}
                >
                  {centuryStr}
                </Link>
              );
            })}
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              centuries: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
