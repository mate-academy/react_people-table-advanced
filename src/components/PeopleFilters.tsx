import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/getSearchWith';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];
  const filterSex = searchParams.get('filterSex') || '';
  const centuries = ['16', '17', '18', '19', '20'];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(
      { query: event.target.value || null },
      searchParams,
    );

    setSearchParams(search);
  }

  function getLinkCenturies(c: string) {
    return {
      search: getSearchWith(
        {
          century: century.includes(c)
            ? century.filter(cen => cen !== c)
            : [...century, c],
        },
        searchParams,
      ),
    };
  }

  function getClassCenturies(c: string) {
    return classNames('button mr-1', {
      'is-info': century.includes(c),
    });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !filterSex })}
          to={{
            search: getSearchWith({ filterSex: null }, searchParams),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': filterSex === 'm' })}
          to={{
            search: getSearchWith({ filterSex: 'm' }, searchParams),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': filterSex === 'f' })}
          to={{
            search: getSearchWith({ filterSex: 'f' }, searchParams),
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
            value={query}
            onChange={handleQueryChange}
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
            {centuries.map(c => (
              <Link
                data-cy="century"
                className={getClassCenturies(c)}
                to={getLinkCenturies(c)}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': century.length,
              })}
              to={{ search: getSearchWith({ century: null }, searchParams) }}
            >
              All
            </Link>
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
