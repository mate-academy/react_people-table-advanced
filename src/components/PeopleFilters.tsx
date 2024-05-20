import { useContext } from 'react';
import { ContextPeople } from '../PeopleContext';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { Filter } from '../types/Filter';

export const PeopleFilters = () => {
  const {
    setSortByCentury,
    query,
    setQuery,
    selectedFilter,
    setSelectedFilter,
    sortByCentury,
  } = useContext(ContextPeople);

  const generateFilter = (filterBy: Filter) => {
    if (filterBy === 'all') {
      return { sex: null };
    }

    return { sex: filterBy };
  };

  const handleCenturyClick = (century: string) => {
    let updatedCenturies: string[];

    if (century === 'all') {
      updatedCenturies = [];
    } else if (sortByCentury.includes(century)) {
      updatedCenturies = sortByCentury.filter(item => item !== century);
    } else {
      updatedCenturies = [...sortByCentury, century];
    }

    setSortByCentury(updatedCenturies);
  };

  const resetFilters = () => {
    setSelectedFilter('all');
    setSortByCentury([]);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': selectedFilter === 'all' })}
          params={generateFilter('all')}
          onClick={() => setSelectedFilter('all')}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedFilter === 'male' })}
          params={generateFilter('male')}
          onClick={() => setSelectedFilter('male')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedFilter === 'female' })}
          params={generateFilter('female')}
          onClick={() => setSelectedFilter('female')}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            data-cy="NameFilter"
            type="search"
            className="input"
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
                className={cn('button mr-1', {
                  'is-info': sortByCentury.includes(century),
                })}
                params={{
                  centuries: sortByCentury.includes(century)
                    ? sortByCentury.filter(cent => cent !== century)
                    : [...sortByCentury, century],
                }}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
              onClick={() => setSortByCentury([])}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetFilters()}
          params={{ sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
