import { FC, ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const centuries = [16, 17, 18, 19, 20];

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === null })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
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
            onChange={onChangeSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': activeCenturies?.includes(`${century}`) },
                )}
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: activeCenturies?.includes(`${century}`)
                        ? activeCenturies.filter(c => c !== `${century}`)
                        : [...activeCenturies, `${century}`],
                    },
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': activeCenturies.length },
              )}
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
