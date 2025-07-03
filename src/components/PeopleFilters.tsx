import { Link } from 'react-router-dom';

type Props = {
  isLoading: boolean;
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

function clearCenturiesInSearch(searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  newSearchParams.delete('centuries');
  const searchString = newSearchParams.toString();

  return searchString ? `?${searchString}` : '';
}

function updateCenturiesInSearch(
  searchParams: URLSearchParams,
  century: string,
) {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const centuries = newSearchParams.getAll('centuries');

  if (centuries.includes(century)) {
    const filtered = centuries.filter(c => c !== century);

    newSearchParams.delete('centuries');
    filtered.forEach(c => newSearchParams.append('centuries', c));
  } else {
    newSearchParams.append('centuries', century);
  }

  const searchString = newSearchParams.toString();

  return searchString ? `?${searchString}` : '';
}

function updateSexInSearch(searchParams: URLSearchParams, sex: string | null) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (sex === null) {
    newSearchParams.delete('sex');
  } else {
    newSearchParams.set('sex', sex);
  }

  const searchString = newSearchParams.toString();

  return searchString ? `?${searchString}` : '';
}

export const PeopleFilters: React.FC<Props> = ({
  isLoading,
  searchParams,
  setSearchParams,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (query === '') {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', query);
    }

    setSearchParams(newSearchParams);
  };

  if (isLoading) {
    return null;
  }

  return (
    !isLoading && (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <Link
            to={{
              pathname: '/people',
              search: updateSexInSearch(searchParams, null),
            }}
          >
            All
          </Link>
          <Link
            to={{
              pathname: '/people',
              search: updateSexInSearch(searchParams, 'm'),
            }}
            className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          >
            Male
          </Link>
          <Link
            to={{
              pathname: '/people',
              search: updateSexInSearch(searchParams, 'f'),
            }}
            className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
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
              value={searchParams.get('query') || ''}
              onChange={handleSearchChange}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {['16', '17', '18', '19', '20'].map(century => (
                <Link
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${
                    searchParams.getAll('centuries').includes(century)
                      ? 'is-info'
                      : ''
                  }`}
                  to={{
                    pathname: '/people',
                    search: updateCenturiesInSearch(searchParams, century),
                  }}
                >
                  {century}
                </Link>
              ))}
            </div>

            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className="button is-success is-outlined"
                to={{
                  pathname: '/people',
                  search: clearCenturiesInSearch(searchParams),
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
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    )
  );
};
