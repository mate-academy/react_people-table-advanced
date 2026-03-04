import classNames from 'classnames';
import { useState } from 'react';
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

type CenturiesType = '16' | '17' | '18' | '19' | '20';
type SexType = {
  title: string;
  to: string;
};

export const PeopleFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const sortBySex = searchParams.get('sex');
  const sortByCentury = searchParams.getAll('centuries');

  const sex: SexType[] = [
    {
      title: 'All',
      to: '',
    },
    {
      title: 'Male',
      to: 'm',
    },
    {
      title: 'Female',
      to: 'f',
    },
  ];
  const centuries: CenturiesType[] = ['16', '17', '18', '19', '20'];

  const centuriesSorting = (century: string) => {
    const params = new URLSearchParams(searchParams);

    if (century === 'all') {
      params.delete('centuries');

      return `?${params.toString()}`;
    }

    if (sortByCentury.includes(century)) {
      const filtered = sortByCentury.filter(item => item !== century);

      params.delete('centuries');
      filtered.forEach(item => params.append('centuries', item));
    } else {
      params.append('centuries', century);
    }

    return `?${params.toString()}`;
  };

  const sexSorting = (currentSex: string) => {
    const params = new URLSearchParams(location.search);

    params.delete('sex');

    if (currentSex) {
      params.set('sex', currentSex);
    }

    return `?${params.toString()}`;
  };

  const nameSorting = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);

    const params = new URLSearchParams(searchParams);

    params.set('query', value);

    if (!value) {
      params.delete('query');
    }

    navigate({
      pathname: '/people',
      search: `?${params.toString()}`,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sex.map(item => {
          const isActive =
            (item.to === '' && !sortBySex) || sortBySex === item.to;

          return (
            <Link
              className={classNames({
                'is-active': isActive,
              })}
              to={{
                pathname: '/people',
                search: sexSorting(item.to),
              }}
              key={item.title}
            >
              {item.title}
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
            value={search}
            onChange={nameSorting}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(item => {
              return (
                <Link
                  key={item}
                  data-cy="century"
                  className={`button mr-1 ${sortByCentury.includes(item) ? 'is-info' : ''}`}
                  to={{
                    pathname: '/people',
                    search: centuriesSorting(item),
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: '/people',
                search: centuriesSorting('all'),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={() => setSearch('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
