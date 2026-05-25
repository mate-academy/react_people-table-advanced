import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
}) => {
  const activeSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const getCenturyLinkTarget = (century: string): string => {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies = newParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      newParams.delete('centuries');
      currentCenturies
        .filter(c => c !== century)
        .forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    return newParams.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={activeSex === null ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }).toString() }}
        >
          All
        </Link>
        <Link
          className={activeSex === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }).toString() }}
        >
          Male
        </Link>
        <Link
          className={activeSex === 'f' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }).toString() }}
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
            value={query || ''}
            onChange={event => {
              const value = event.target.value;
              const searchString = getSearchWith(searchParams, {
                query: value || null,
              });

              setSearchParams(new URLSearchParams(searchString.toString()));
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
            <Link
              data-cy="century"
              className={
                activeCenturies.includes('16')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: getCenturyLinkTarget('16') }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={
                activeCenturies.includes('17')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: getCenturyLinkTarget('17') }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={
                activeCenturies.includes('18')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: getCenturyLinkTarget('18') }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={
                activeCenturies.includes('19')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: getCenturyLinkTarget('19') }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={
                activeCenturies.includes('20')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: getCenturyLinkTarget('20') }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={
                activeCenturies.length === 0
                  ? 'button mr-1 is-success is-outlined'
                  : 'button mr-1'
              }
              to={{
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
