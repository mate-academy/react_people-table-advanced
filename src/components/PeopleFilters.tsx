import { useSearchParams, Link } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

const centuriesList = ['16', '17', '18', '19', '20'];
const sexsList = [
  { title: 'All', filter: null },
  { title: 'Male', filter: 'm' },
  { title: 'Female', filter: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const setSearchWith = (data: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, data));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const formattingCenturies = (century: string): string[] => {
    const newCenturys = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return newCenturys;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexsList.map(sexOption => {
          const isActive = sexOption.filter === sex;

          return (
            <SearchLink
              key={sexOption.title}
              className={classNames(isActive ? 'is-active' : '')}
              params={{ sex: sexOption.filter }}
            >
              {sexOption.title}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
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
          <div className="level-left">
            {centuriesList.map(century => {
              const isActive = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  params={{ centuries: formattingCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to=".">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
