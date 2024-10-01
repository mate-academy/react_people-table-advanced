import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterByCentury, FilterBySex } from '../types';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = (searchParams.get('sex') as FilterBySex) || FilterBySex.All;
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    const params = new URLSearchParams(searchParams);

    if (value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  };

  const updateCentury = (century: string) => {
    const updatedCenturies = centuries.includes(century)
      ? centuries.filter(existingCentury => existingCentury !== century)
      : [...centuries, century];

    return { centuries: updatedCenturies.length ? updatedCenturies : null };
  };

  const resetFiltersParams: SearchParams = {
    query: null,
    sex: null,
    centuries: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: FilterBySex.Male }}
          className={classNames({ 'is-active': sex === FilterBySex.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: FilterBySex.Female }}
          className={classNames({ 'is-active': sex === FilterBySex.Female })}
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
            {Object.values(FilterByCentury).map(valueFilter => (
              <SearchLink
                key={valueFilter}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(valueFilter.toString()),
                })}
                params={updateCentury(valueFilter)}
              >
                {valueFilter}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetFiltersParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
