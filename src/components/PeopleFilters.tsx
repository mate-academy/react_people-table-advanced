import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const centuries = ['16', '17', '18', '19', '20'];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event?.target.value);

    if (event.target.value) {
      searchParams.set('name', event.target.value);
    } else {
      searchParams.delete('name');
    }

    setSearchParams(searchParams);
  };

  const toggleCenturyFilter = (century: string) => {
    const tempCenturies = searchParams.getAll('centuries');

    if (tempCenturies.includes(century)) {
      searchParams.delete('centuries');
      tempCenturies
        .filter(c => c !== century)
        .forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }

    setSearchParams(searchParams);
  };

  const toggleAllCenturies = () => {
    ['16', '17', '18', '19', '20'].forEach(century => {
      searchParams.append('centuries', century);
    });

    setSearchParams(searchParams);
  };

  useEffect(() => {
    setNameFilter(searchParams.get('name') || '');
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link className={cn({ 'is-active': !sex })} to="/people">
          All
        </Link>
        <Link className={cn({ 'is-active': sex === 'm' })} to="/people?sex=m">
          Male
        </Link>
        <Link className={cn({ 'is-active': sex === 'f' })} to="/people?sex=f">
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
            value={nameFilter}
            onChange={handleNameChange}
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
              <button
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
                onClick={() => toggleCenturyFilter(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={toggleAllCenturies}
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
