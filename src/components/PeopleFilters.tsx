import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value });
  };

  function toggleCentury(century: string) {
    const updatedCenturies = new Set(centuries);

    if (updatedCenturies.has(century)) {
      updatedCenturies.delete(century);
    } else {
      updatedCenturies.add(century);
    }

    return Array.from(updatedCenturies);
  }

  const getSexButtonText = React.useMemo(() => {
    return (gender: string) => {
      if (gender === '') {
        return 'All';
      }

      if (gender === 'm') {
        return 'Male';
      }

      return 'Female';
    };
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map((gender) => (
          <SearchLink
            key={gender}
            params={{ sex: gender }}
            className={cn({
              'is-active': sex === gender,
            })}
          >
            {getSexButtonText(gender)}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleNameFilter}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century) => (
              <SearchLink
                key={century}
                params={{ centuries: toggleCentury(century.toString()) }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={cn('button is-success is-outlined', {
                'is-active': !centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            centuries: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
