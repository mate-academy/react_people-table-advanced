import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SexSearchLink } from '../SexSearchLink';

export const PeopleFilters: FC = () => {
  const avaibleCenturies = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.trimStart() || null;

    setSearchParams(
      getSearchWith(
        searchParams,
        { query: currentValue },
      ),
    );
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SexSearchLink sex={null} text="All" />
          <SexSearchLink sex="m" text="Male" />
          <SexSearchLink sex="f" text="Female" />
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
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {avaibleCenturies.map(century => (
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      {
                        centuries: centuries.includes(century)
                          ? centuries.filter(c => c !== century)
                          : [...centuries, century],
                      },
                    ),
                  }}
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </Link>
              ))}
            </div>

            <div className="level-right ml-4">
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    { centuries: [] },
                  ),
                }}
                data-cy="centuryALL"
                className={classNames(
                  'button is-success',
                  { 'is-outlined': centuries.length !== 0 },
                )}
              >
                All
              </Link>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            to={{
              search: getSearchWith(
                searchParams,
                { sex: null, centuries: [], query: null },
              ),
            }}
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    </>
  );
};
