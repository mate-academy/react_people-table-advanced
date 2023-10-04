import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES_LINK } from '../utils/variables';
import { Gender } from '../types/Gender';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = { query: event.target.value || null };
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === Gender.Male })}
          to={{ search: getSearchWith(searchParams, { sex: Gender.Male }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === Gender.Female })}
          to={{ search: getSearchWith(searchParams, { sex: Gender.Female }) }}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_LINK.map(century => {
              const isActive = centuries.includes(century);
              const newCentury = isActive
                ? centuries.filter(cent => cent !== century)
                : [...centuries, century];
              const newSearch = getSearchWith(
                searchParams, { centuries: newCentury },
              );

              return (
                <Link
                  key={century}
                  data-cy="century"
                  to={{ search: newSearch }}
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': isActive },
                  )}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length !== 0 },
              )}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
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
