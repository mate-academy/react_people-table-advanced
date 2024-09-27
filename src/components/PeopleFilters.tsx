import { Link, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function getCenturies(min: number, max: number) {
    const centuryNumbers = [];

    for (let i = min; i <= max; i++) {
      centuryNumbers.push(i);
    }

    return centuryNumbers;
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: e.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={classnames({ 'is-active': sex === '' })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          className={classnames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          className={classnames({ 'is-active': sex === 'f' })}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {getCenturies(15, 20).map((c, i) => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(`${c}`)
                      ? centuries.filter(cent => cent !== `${c}`)
                      : [...centuries, `${c}`],
                  }),
                }}
                data-cy="century"
                className={classnames('button', 'mr-1', {
                  'is-info': centuries.includes(`${c}`),
                })}
                key={c + i}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
