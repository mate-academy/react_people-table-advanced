import { FilterEnum } from '../types/Filter';
import { Person } from '../types';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface PeopleFiltersProps {
  people?: Person[];
  filter: FilterEnum;
  setFilter: (filter: FilterEnum) => void;
}

//
//
export const PeopleFilters = ({ filter, setFilter }: PeopleFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const numeric = searchParams.getAll('numeric');

  const centuries = ['16', '17', '18', '19', '20'];

  function getSearchWith(params: Record<string, string | string[] | null>) {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(v => newParams.append(key, v));
      } else {
        newParams.set(key, value);
      }
    });

    return newParams.toString();
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(getSearchWith({ query: e.target.value || null }));
  }

  function toggleCentury(century: string) {
    const newNumeric = numeric.includes(century)
      ? numeric.filter(n => n !== century)
      : [...numeric, century];

    setSearchParams(
      getSearchWith({ numeric: newNumeric.length ? newNumeric : null }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to="/people"
          className={classNames('panel-tab', {
            'is-active': filter === FilterEnum.all,
          })}
          onClick={() => setFilter(FilterEnum.all)}
        >
          All
        </NavLink>

        <NavLink
          to="/people?sex=m"
          className={classNames('panel-tab', {
            'is-active': filter === FilterEnum.male,
          })}
          onClick={() => setFilter(FilterEnum.male)}
        >
          Male
        </NavLink>

        <NavLink
          to="/people?sex=f"
          className={classNames('panel-tab', {
            'is-active': filter === FilterEnum.female,
          })}
          onClick={() => setFilter(FilterEnum.female)}
        >
          Female
        </NavLink>
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
            {centuries.map(century => {
              const isSelected = numeric.includes(century);
              const newNumeric = isSelected
                ? numeric.filter(n => n !== century)
                : [...numeric, century];

              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  to={{
                    search: getSearchWith({
                      numeric: newNumeric.length ? newNumeric : null,
                      query: query || null,
                    }),
                  }}
                  onClick={() => toggleCentury(century)}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success is-outlined ${
                numeric.length === 0 ? 'is-active' : ''
              }`}
              to={{
                search: getSearchWith({ numeric: null }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
