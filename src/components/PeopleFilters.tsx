import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: newQuery || null,
    });

    setSearchParams(newSearch);
  };

  const getCenturyLink = (century: string) => {
    let updatedCenturies = [...centuries];

    if (updatedCenturies.includes(century)) {
      updatedCenturies = updatedCenturies.filter(c => c !== century);
    } else {
      updatedCenturies.push(century);
    }

    return (
      '?' +
      getSearchWith(searchParams, {
        centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
      })
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={'?' + getSearchWith(searchParams, { sex: null })}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={'?' + getSearchWith(searchParams, { sex: 'm' })}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={'?' + getSearchWith(searchParams, { sex: 'f' })}
        >
          Female
        </Link>
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                to={getCenturyLink(century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${centuries.length === 0 ? 'is-outlined' : ''}`}
              to={'?' + getSearchWith(searchParams, { centuries: null })}
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
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
