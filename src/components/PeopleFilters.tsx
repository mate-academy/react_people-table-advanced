import cn from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuryArr = ['16', '17', '18', '19', '20'];

  const onChangeInput = (value: string) => {
    const search = getSearchWith(searchParams, { query: value || null });

    setSearchParams(search);
  };

  const setCenturies = (centuriesArr: string[], centuryItem: string) => {
    return centuriesArr.includes(centuryItem)
      ? centuries.filter((item) => item !== centuryItem)
      : [...centuries, centuryItem];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': sex === null })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={({ target }) => onChangeInput(target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryArr.map((century) => (
              <Link
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: setCenturies(centuries, century),
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', { 'is-outlined': !centuries })}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
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
              sex: null,
              query: null,
              centuries: [],
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
