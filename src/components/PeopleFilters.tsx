import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const searchInput = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const centuriesForFilter = [16, 17, 18, 19, 20];

  function searchFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', event.target.value);
    setSearchParams(newParams);
  }

  function centuriesFilter(centurie: string) {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies = newParams.getAll('centuries');

    if (currentCenturies.includes(`${centurie}`)) {
      newParams.delete('centuries');
      currentCenturies
        .filter(c => c !== `${centurie}`)
        .forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', `${centurie}`);
    }

    return newParams.toString();
  }

  const centuriesReset = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');

    return newParams.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !selectedSex,
          })}
          to={{
            pathname,
            search: new URLSearchParams(
              Object.fromEntries(
                [...searchParams.entries()].filter(([key]) => key !== 'sex'),
              ),
            ).toString(),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': selectedSex === 'm',
          })}
          to={{
            pathname,
            search: new URLSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              sex: 'm',
            }).toString(),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': selectedSex === 'f',
          })}
          to={{
            pathname,
            search: new URLSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              sex: 'f',
            }).toString(),
          }}
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
            value={searchInput}
            onChange={searchFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesForFilter.map(centurie => (
              <Link
                key={centurie}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(`${centurie}`),
                })}
                to={{
                  pathname,
                  search: centuriesFilter(`${centurie}`),
                }}
              >
                {centurie}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname,
                search: centuriesReset(),
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
          to={{
            pathname,
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
