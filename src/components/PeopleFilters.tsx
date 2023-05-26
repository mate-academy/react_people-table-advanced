import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { FC, useEffect } from 'react';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  handleFilteredPeople: (arg: string, arg2: string, arg3: string[]) => void;
}

export const PeopleFilters: FC<Props> = ({ handleFilteredPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    setSearchParams(
      getSearchWith(currentSearchParams, { query: event.target.value || null }),
    );
  };

  useEffect(
    () => handleFilteredPeople(sex, query, centuries),
    [sex, query, centuries],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={cn({ 'is-active': sex === '' })}
        >
          All
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          className={cn({ 'is-active': sex === 'f' })}
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
            {['16', '17', '18', '19', '20'].map((century) => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith(new URLSearchParams(),
                  { centuries: [] }),
              }}
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
            search: getSearchWith(new URLSearchParams(), {}),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
