import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Centuries, Sexes } from '../types/SortTypes';

interface Props {
  changeHandle: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  searchParams: URLSearchParams,
  centuries: string[],
  sexQuery: string,
  query: string
}

export const PeopleFilters: React.FC<Props> = ({
  changeHandle, searchParams, centuries, sexQuery, query,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Sexes.map(sex => {
          const setSex = sex === 'All' ? null : sex.slice(0, 1).toLowerCase();

          return (
            <Link
              className={
                classNames({
                  'is-active': sexQuery === setSex,
                })
              }
              to={{
                search:
                  getSearchWith(
                    searchParams, { sex: setSex },
                  ),
              }}
              key={sex}
            >
              {sex}
            </Link>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={changeHandle}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Centuries.map(century => (
              <Link
                data-cy="century"
                className={
                  classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })
                }
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(someCentury => someCentury !== century)
                      : [...centuries, century],
                  }),
                }}
                key={century}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={
                classNames('button', 'is-success',
                  {
                    'is-outlined': centuries.length,
                  })
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
