import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { Sex } from '../../types/Sex';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const navigate = useNavigate();

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === Sex.male })}
          to={{
            search: getSearchWith(searchParams, { sex: Sex.male }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === Sex.female })}
          to={{
            search: getSearchWith(searchParams, { sex: Sex.female }),
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
            value={query}
            onChange={onQueryChange}
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
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? [...centuries.filter(item => item !== century)]
                      : [...centuries, century],
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
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
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
            search: getSearchWith(searchParams, {
              centuries: null,
              sex: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
