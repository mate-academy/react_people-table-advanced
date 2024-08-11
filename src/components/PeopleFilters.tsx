import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const centuries = ['16', '17', '18', '19', '20'];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newName) {
      newParams.set('name', newName);
    } else {
      newParams.delete('name');
    }

    setSearchParams(newParams);
  };

  const toggleCenturyFilter = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const tempCenturies = newParams.getAll('centuries');

    if (tempCenturies.includes(century)) {
      newParams.delete('centuries');
      tempCenturies
        .filter(c => c !== century)
        .forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const getCenturyParams = (centuriesToInclude: string[]) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    centuriesToInclude.forEach(c => newParams.append('centuries', c));

    return newParams;
  };

  const handleAllCenturiesClick = () => {
    const allCenturies = ['16', '17', '18', '19', '20'];

    setSearchParams(getCenturyParams(allCenturies));
  };

  useEffect(() => {
    setNameFilter(searchParams.get('name') || '');
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
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
            <SearchLink
              params={{ centuries: [] }}
              className="button is-success is-outlined"
              onClick={handleAllCenturiesClick}
            >
              All
            </SearchLink>
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
