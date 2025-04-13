import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../types/SearchParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleNameFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function getUpdatedCenturiesParams(
    current: URLSearchParams,
    century: string,
  ): SearchParams {
    const currentParams = current.getAll('centuries');

    const newCenturies = currentParams.includes(century)
      ? currentParams.filter(c => c !== century)
      : [...currentParams, century];

    return { centuries: newCenturies };
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          to={'/people'}
        >
          All
        </NavLink>
        <NavLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={'/people?sex=m'}
        >
          Male
        </NavLink>
        <NavLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={'/people?sex=f'}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            value={query}
            onChange={event => handleNameFilter(event)}
            placeholder="Search"
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
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={getUpdatedCenturiesParams(searchParams, century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              href="#/people"
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
