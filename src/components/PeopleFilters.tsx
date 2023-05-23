import classNames from 'classnames';
import { Link, URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  query: string,
  centuries: string[],
  sexValue: string,
  serchParams: URLSearchParams,
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: string;
  } | undefined) => void
};

export const PeopleFilters: React.FC<Props> = ({
  query, centuries, sexValue, serchParams, setSearchParams,
}) => {
  const hendleChangeQuery = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setSearchParams(
    getSearchWith(
      serchParams,
      { query: e.currentTarget.value || null },
    ),
  );

  const linkUrl = (value: string) => {
    return {
      search: getSearchWith(
        serchParams,
        {
          centuries: centuries.includes(value)
            ? centuries.filter(itemCentury => itemCentury !== value)
            : [...centuries, value],
        },
      ),
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sexValue })}
          to={{ search: getSearchWith(serchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sexValue === 'm' })}
          to={{ search: getSearchWith(serchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sexValue === 'f' })}
          to={{ search: getSearchWith(serchParams, { sex: 'f' }) }}
        >
          Female
        </Link>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={hendleChangeQuery}
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
                to={linkUrl(century)}
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(`${century}`) },
                )}
              >
                {century}
              </Link>
            ))}
          </div>
          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(serchParams, { centuries: null }) }}
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
            >
              All
            </Link>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <Link
          className={classNames(
            'button is-link is-fullwidth',
            { 'is-outlined': !query && !(centuries.length > 0) && !sexValue },
          )}
          to={{
            search: getSearchWith(
              serchParams,
              { query: null, sex: null, centuries: null },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
