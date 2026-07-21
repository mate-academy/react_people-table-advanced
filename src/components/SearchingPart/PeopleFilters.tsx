import classNames from 'classnames';
import { Link, SetURLSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

const centuries: string[] = ['16', '17', '18', '19', '20'];

export interface FilterProps {
  centuryFilter: string[];

  sexFilter: string | null;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const PeopleFilters: React.FC<FilterProps> = ({
  centuryFilter,
  sexFilter,
  searchParams,
  setSearchParams,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sexFilter })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sexFilter === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sexFilter === 'f' })}
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
            onChange={event => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              );
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
            {centuries.map((century: string) => {
              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-active is-info': centuryFilter.includes(century),
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: centuryFilter.includes(century)
                        ? centuryFilter.filter(year => century !== year)
                        : [...centuryFilter, century],
                    }),
                  }}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-active ': centuryFilter.length === 0,
                'is-outlined': centuryFilter.length !== 0,
              })}
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
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

// кнопка all у сортуванні статі, не показує всі, а працює як ресет
