import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FilterCenturies, FiltersSex } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesList = ['16', '17', '18', '19', '20'] as FilterCenturies[];
  const sexFiltersList = ['All', 'Male', 'Female'] as FiltersSex[];
  const query = searchParams.get('query') || '';
  const filterSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  function setSearchWith(paramsToUpdate: SearchParams) {
    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  }

  const sexFilter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sex: FiltersSex,
  ) => {
    e.preventDefault();
    switch (sex) {
      case 'All':
        setSearchWith({ sex: null });
        break;
      case 'Male':
        setSearchWith({ sex: 'm' });
        break;
      case 'Female':
        setSearchWith({ sex: 'f' });
        break;
    }
  };

  const inputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  function toggleCenturies(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    cent: string,
  ) {
    e.preventDefault();
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(century => century !== cent)
      : [...centuries, cent];

    setSearchWith({ centuries: newCenturies.length > 0 ? newCenturies : null });
  }

  const resetCenturies = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSearchWith({ centuries: null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFiltersList.map(sex => (
          <Link
            key={sex}
            className={classNames({
              'is-active':
                (!filterSex && sex === 'All') ||
                (filterSex === 'm' && sex === 'Male') ||
                (filterSex === 'f' && sex === 'Female'),
            })}
            to="#"
            onClick={e => {
              sexFilter(e, sex);
            }}
          >
            {sex}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={inputFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <Link
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to="#"
                onClick={e => {
                  toggleCenturies(e, century);
                }}
              >
                {century}
              </Link>
            ))}
            <Link
              data-cy="centuryAll"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to="#"
              onClick={resetCenturies}
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
