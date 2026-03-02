import classNames from 'classnames';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';

const centuryFilter = [
  { title: '16' },
  { title: '17' },
  { title: '18' },
  { title: '19' },
  { title: '20' },
];

type Props = {
  people: Person[] | undefined;
};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const handleCenturyClick = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    if (current.includes(century)) {
      params.delete('centuries');
      current
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const getLink = (sexy: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sexy) {
      params.set('sex', sexy);
    } else {
      params.delete('sex');
    }

    return `/people?${params.toString()}`;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink(null)}
        >
          All
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink('m')}
        >
          Male
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink('f')}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {centuryFilter.map(filter => {
            const isActive = searchParams
              .getAll('centuries')
              .includes(filter.title);

            return (
              <button
                key={filter.title}
                className={classNames('button mr-1', { 'is-info': isActive })}
                onClick={() => handleCenturyClick(filter.title)}
                type="button"
              >
                {filter.title}
              </button>
            );
          })}

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, {
                  centuries: null,
                }).toString(),
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
