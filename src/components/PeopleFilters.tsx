import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { FilterBy } from '../types/FilterBy';
import { useEffect, useState } from 'react';
import { centuryList } from '../utils/centuryList';
import { QueryParams } from '../enum/queryParams.enum';
import { Sex } from '../enum/sex.enum';

type PeopleFilterProps = {
  searchParams: URLSearchParams;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  activeQuery: string;
  toggleCenturies: (currentCentury: number) => string[];
  activeCenturies: string[];
};

export const PeopleFilters = ({
  toggleCenturies,
  searchParams,
  setQuery,
  activeQuery,
  setSearchParams,
  activeCenturies,
}: PeopleFilterProps) => {
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    setActiveFilter(searchParams.get(QueryParams.Sex) || '');
    setQuery(searchParams.get(QueryParams.Query) || '');
  }, [searchParams, setQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!event.target.value) {
      newSearchParams.delete(QueryParams.Query);
    } else {
      newSearchParams.set(QueryParams.Query, event.target.value);
    }

    setSearchParams(newSearchParams);
  };

  const resetAllFilters = () => {
    setQuery('');
    setActiveFilter('');
    setSearchParams(new URLSearchParams());
  };

  const handleResetSexFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(QueryParams.Sex);
    setSearchParams(newSearchParams);
  };

  const handleSetMaleFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QueryParams.Sex, Sex.Male);
    setSearchParams(newSearchParams);
  };


  const handleSetFemaleFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QueryParams.Sex, Sex.Female);
    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': activeFilter === '' })}
          href="#"
          onClick={handleResetSexFilter}
        >
          {FilterBy.All}
        </a>
        <a
          className={cn({ 'is-active': activeFilter === Sex.Male })}
          href="#"
          onClick={handleSetMaleFilter}
        >
          {FilterBy.Male}
        </a>
        <a
          className={cn({ 'is-active': activeFilter === Sex.Female })}
          href="#"
          onClick={handleSetFemaleFilter}
        >
          {FilterBy.Female}
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={activeQuery}
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
            {centuryList.map((century, index) => (
              <SearchLink
                key={index}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': activeCenturies.includes(String(century)),
                })}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success ', {
                'is-outlined': !!activeCenturies.length,
              })}
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={resetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
}
