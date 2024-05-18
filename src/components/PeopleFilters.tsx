import { useContext } from 'react';
import { ContextPeople } from '../PeopleContext';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { Filter } from '../types/Filter';

export const PeopleFilters = () => {
  const {
    searchParams,
    // cent,
    selectedFilter,
    setSelectedFilter,
    sortByCentury,
    generateCentury,
    handleCenturyClick,
  } = useContext(ContextPeople);

  const generateFilter = (filterBy: Filter) => {
    if (filterBy === 'all') {
      return { sex: null };
    }

    return { sex: filterBy };
  };

  // const generateCentury = (century: string) => {
  //   if (century === 'all') {
  //     return { centuries: null };
  //   }

  //   return {
  //     centuries: sortByCentury.includes(century)
  //       ? sortByCentury
  //       : [...sortByCentury, century],
  //   };
  // };

  // const handleCenturyClick = (century: string) => {
  //   let updatedCenturies = sortByCentury.includes(century)
  //     ? sortByCentury.filter(item => item !== century)
  //     : [...sortByCentury, century];

  //   if (century === 'all') {
  //     updatedCenturies = [];
  //   }

  //   setSortByCentury(updatedCenturies);
  // };

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
                  'is-info': searchParams.has('centuries', century),
                })}
                params={generateCentury(century)}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': sortByCentury.length,
              })}
              params={generateCentury('all')}
              onClick={() => handleCenturyClick('all')}
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
