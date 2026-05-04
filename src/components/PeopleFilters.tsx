import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQuerySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim() || null;

    setSearchParams(getSearchWith(searchParams, { query: value }));
  };

  const handleClickCenturies = (clicked: string) => {
    if (centuries.includes(clicked)) {
      return centuries.filter(c => c !== clicked);
    }

    return [...centuries, clicked];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={sex === null ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            onChange={handleQuerySearch}
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
              to={{
                search: getSearchWith(searchParams, {
                  centuries: handleClickCenturies('16'),
                }),
              }}
              data-cy="century"
              className={
                centuries.includes('16') ? 'button mr-1 is-info' : 'button'
              }
            >
              16
            </Link>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  centuries: handleClickCenturies('17'),
                }),
              }}
              data-cy="century"
              className={
                centuries.includes('17') ? 'button mr-1 is-info' : 'button'
              }
            >
              17
            </Link>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  centuries: handleClickCenturies('18'),
                }),
              }}
              data-cy="century"
              className={
                centuries.includes('18') ? 'button mr-1 is-info' : 'button'
              }
            >
              18
            </Link>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  centuries: handleClickCenturies('19'),
                }),
              }}
              data-cy="century"
              className={
                centuries.includes('19') ? 'button mr-1 is-info' : 'button'
              }
            >
              19
            </Link>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  centuries: handleClickCenturies('20'),
                }),
              }}
              data-cy="century"
              className={
                centuries.includes('20') ? 'button mr-1 is-info' : 'button'
              }
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success '
                  : 'button is-outlined'
              }
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{ search: '' }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
