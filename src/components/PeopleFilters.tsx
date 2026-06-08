import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const query = searchParams.get('query') || '';

  const selectedCenturies = searchParams.getAll('centuries');

  const centuriesList = ['16', '17', '18', '19', '20'];

  //Інпут для пошуку по імені//

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (text.trim()) {
      newParams.set('query', text);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  // Фільтр за статтю //

  const getUpdatedCenturies = (targetCentury: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const activeCenturies = currentParams.getAll('centuries');

    const nextCenturies = activeCenturies.includes(targetCentury)
      ? activeCenturies.filter(century => century !== targetCentury)
      : [...activeCenturies, targetCentury];

    currentParams.delete('centuries');

    nextCenturies.forEach(century => {
      currentParams.append('centuries', century);
    });

    return currentParams.getAll('centuries').length > 0
      ? currentParams.getAll('centuries')
      : null;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={currentSex === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={currentSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={query}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="buttons" data-cy="CenturyFilter">
          {centuriesList.map(century => {
            const centuryStr = century.toString();
            const isSelected = selectedCenturies.includes(centuryStr);

            return (
              <SearchLink
                key={centuryStr}
                className={`button ${isSelected ? 'is-info' : ''}`}
                params={{ centuries: getUpdatedCenturies(centuryStr) }}
              >
                {centuryStr}
              </SearchLink>
            );
          })}

          <SearchLink
            className="button is-success"
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>

      {/* Кнопка скидання всіх фільтрів (Reset all filters) */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-light is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
