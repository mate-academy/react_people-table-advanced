import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || Sex.All;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([key, value]) => (
          <Link
            className={classNames([
              {
                'is-active': value === sex,
              },
            ])}
            to={{
              search: getSearchWith(searchParams, {
                sex: value === Sex.All ? null : value,
              }),
            }}
            key={key}
          >
            {key}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value === '' ? null : event.target.value,
                }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={classNames([
                  'button',
                  'mr-1',
                  {
                    'is-info': centuries.includes(cent),
                  },
                ])}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(cent)
                      ? centuries.filter(c => c !== cent)
                      : [...centuries, cent],
                  }),
                }}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
