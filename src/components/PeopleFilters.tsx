import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { FilterBySex } from '../models/filter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string[] | string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v));
    } else if (value) {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const sex = searchParams.get('sex') || 'all';
  const activeCenturies = searchParams.getAll('centuries');

  const handleCenturyClick = (event: React.MouseEvent, century: string) => {
    event.preventDefault();

    const updatedCenturies = activeCenturies.includes(century)
      ? activeCenturies.filter(c => c !== century)
      : [...activeCenturies, century];

    updateSearchParams(
      'centuries',
      updatedCenturies.length ? updatedCenturies : [],
    );
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();

    newParams.set('sex', 'all');
    setSearchParams(newParams);
  };

  const filtersBySex = [
    { label: 'All', value: FilterBySex.All },
    { label: 'Male', value: FilterBySex.Male },
    { label: 'Female', value: FilterBySex.Female },
  ];

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filtersBySex.map(filter => (
          <>
            <a
              key={filter.value}
              className={classNames({ 'is-active': sex === filter.value })}
              href={`#/people${filter.value !== FilterBySex.All ? `?sex=${filter.value}` : ''}`}
              onClick={event => {
                event.preventDefault();
                updateSearchParams('sex', filter.value);
              }}
            >
              {filter.label}
            </a>
          </>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') || ''}
            onChange={event =>
              updateSearchParams('query', event.target.value || null)
            }
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
            {centuries.map(century => (
              <a
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => handleCenturyClick(e, century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': activeCenturies.length === 0,
              })}
              href="/people"
              onClick={e => {
                e.preventDefault();
                updateSearchParams('centuries', []);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={resetFilters}
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
