import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  centuries: number[];
  selectedCenturies: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  selectedCenturies,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';

  // Manipulador para busca por nome
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    const newParams = {
      query: newValue ? newValue : null,
    };
    const newSearchString = getSearchWith(searchParams, newParams);

    setSearchParams(newSearchString);
  };

  const allCenturiesSelected = selectedCenturies.length === 0;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Filter by Sex */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      {/* Filter by Name */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Buscar"
            onChange={handleQueryChange}
            value={query}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* Filter by Century */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(centuryNumber => {
              const centuryString = String(centuryNumber);
              const isSelected = selectedCenturies.includes(centuryString);

              // Alterna a seleção do século
              const newCenturies = isSelected
                ? selectedCenturies.filter(c => c !== centuryString)
                : [...selectedCenturies, centuryString];

              const params = {
                centuries: newCenturies.length > 0 ? newCenturies : null,
              };

              return (
                <SearchLink
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  key={centuryString}
                  params={params}
                >
                  {centuryString}
                </SearchLink>
              );
            })}
          </div>

          {/* Botão "All" para Centuries */}
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success is-outlined ${allCenturiesSelected ? 'is-active' : ''}`}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset de Filtros */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Clear all filters
        </SearchLink>
      </div>
    </nav>
  );
};
