import classNames from 'classnames';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Centuries, getSearchWith, Sex } from '../utils/searchHelper';
import { useState } from 'react';
import { activeCenturies } from '../utils/Actions';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const { slug } = useParams();

  const params = new URLSearchParams(searchParams.toString());
  const sex = params.get('sex') as Sex | null;
  const centuries = params.getAll('centuries') as Centuries;
  const getSexActiveLink = (value: Sex | null) => {
    return classNames('', {
      'is-active': (value === null && !sex) || value === sex,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink className={getSexActiveLink(null)} to="/people">
          All
        </NavLink>
        <NavLink
          className={getSexActiveLink('m')}
          to={{
            pathname: `/people/${slug ? slug : ''}`,
            search: `?${getSearchWith(searchParams, { sex: 'm' })}`,
          }}
        >
          Male
        </NavLink>
        <NavLink
          className={getSexActiveLink('f')}
          to={{
            pathname: `/people/${slug ? slug : ''}`,
            search: `?${getSearchWith(searchParams, { sex: 'f' })}`,
          }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={event => {
              setQuery(event.target.value);
              setSearchParams(
                getSearchWith(searchParams, {
                  query:
                    event.target.value.length > 0 ? event.target.value : null,
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
            {[16, 17, 18, 19, 20].map(num => (
              <NavLink
                key={num}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries?.includes(num.toString()),
                })}
                to={{
                  pathname: `/people/${slug ? slug : ''}`,
                  search: `${getSearchWith(searchParams, { centuries: activeCenturies(num, centuries) })}`,
                }}
              >
                {num}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: `/people/${slug ? slug : ''}`,
                search: `?${getSearchWith(searchParams, { centuries: null })}`,
              }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: `/people/${slug ? slug : ''}`,
            search: `?${getSearchWith(searchParams, { sex: null, centuries: null })}`,
          }}
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
