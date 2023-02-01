import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ChangeEvent } from 'react';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const possibleCenturies = ['16', '17', '18', '19', '20'];
  const centuriesParams = searchParams.getAll('centuries') || [];

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || null;

    setSearchParams(getSearchWith(searchParams, { query }));
  };

  const setCenturies = (century: string) => {
    if (centuriesParams.includes(century)) {
      const updatedCentury = centuriesParams.filter(c => c !== century);

      return { centuries: updatedCentury };
    }

    return { centuries: [...centuriesParams, century] };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        <Link
          className={cn({
            'is-active': searchParams.get('sex') === null,
          })}
          to="/people"
        >
          All
        </Link>
        <Link
          className={cn({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={cn({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
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
            value={searchParams.get('query') || ''}
            onChange={onSearchChange}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {possibleCenturies.map(century => (
              <Link
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesParams.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, setCenturies(century)),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesParams.length > 0,
              })}
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
