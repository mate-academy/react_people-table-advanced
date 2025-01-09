import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { FILTER_BY } from '../types/Filter';
import cl from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { getUpperFirstChar } from '../utils/methods';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: !e.target.value ? null : e.target.value,
    });

    setSearchParams(search);
  };

  const searchWithSex = (value: string | null) =>
    getSearchWith(searchParams, { sex: !value ? null : value });

  const searchWithCenturies = (value: string) => {
    const newCenturies = centuries.includes(value)
      ? centuries.filter(c => c !== value)
      : [...centuries, value];

    return getSearchWith(searchParams, { centuries: newCenturies });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FILTER_BY).map(([key, value]) => (
          <NavLink
            className={cl({
              'is-active': (!sex && key === 'all') || sex === value,
            })}
            key={key}
            to={`?${searchWithSex(value)}`}
            state={{ search: searchParams.toString() }}
          >
            {getUpperFirstChar(key)}
          </NavLink>
        ))}
        {/* <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a> */}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(n => (
              <Link
                key={n}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(n.toString()),
                })}
                to={`?${searchWithCenturies(n.toString())}`}
                state={{ search: searchParams.toString() }}
              >
                {n}
              </Link>
            ))}
            {/* <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a> */}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={`?${getSearchWith(searchParams, { centuries: null })}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to=".">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
