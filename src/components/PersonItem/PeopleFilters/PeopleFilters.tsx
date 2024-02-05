import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SexFilter } from '../../../types/SexFilter';

const CENTURIES = [16, 17, 18, 19];

export const PeopleFilters = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century');
  const sex = searchParams.get('sex');

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  function deleteCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  function toggleCentury(data: number) {
    const century = data.toString();

    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    params.delete('century');

    newCenturies.forEach(el => {
      params.append('century', el);
    });

    setSearchParams(params);
  }

  function handleSexFilter(filter: SexFilter) {
    const params = new URLSearchParams(searchParams);

    if (!filter) {
      params.delete('sex');
    } else {
      params.set('sex', filter);
    }

    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        <Link
          type="button"
          className={classNames({ 'is-active': !sex })}
          to={`${handleSexFilter(SexFilter.all)}`}
          onClick={() => handleSexFilter(SexFilter.all)}
        >
          All
        </Link>

        <Link
          type="button"
          className={classNames({ 'is-active': sex === 'm' })}
          to={`${handleSexFilter(SexFilter.male)}`}
        >
          Male
        </Link>

        <Link
          type="button"
          className={classNames({ 'is-active': sex === 'f' })}
          to={`${handleSexFilter(SexFilter.female)}`}
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
            value={query || ''}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <button
                type="button"
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => deleteCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="../people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
