import cn from 'classnames';

import { SearchLink } from './SearchLink';
import {
  FilterBy,
  GENDER_MAP,
  GenderKey,
  genderKeyFemale,
  genderKeyMale,
} from '../types/FilterBy';
import React, { useEffect, useState } from 'react';

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
  const [activeFilter, setActiveFilter] = useState<GenderKey | ''>('');
  const centuryList = [16, 17, 18, 19, 20];

  useEffect(() => {
    setActiveFilter((searchParams.get('sex') || '') as GenderKey | '');
    setQuery(searchParams.get('query') || '');
  }, [searchParams, setQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!event.target.value) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', event.target.value);
    }

    setSearchParams(newSearchParams);
  };

  const handleSexFilter =
    (sex: GenderKey | '') => (event: React.MouseEvent) => {
      event.preventDefault();
      const newSearchParams = new URLSearchParams(searchParams);

      if (!sex) {
        newSearchParams.delete('sex');
      } else {
        newSearchParams.set('sex', sex);
      }

      setSearchParams(newSearchParams);
    };

  const handleCenturyAll = (event: React.MouseEvent) => {
    event.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('centuries');
    setSearchParams(newSearchParams);
  };

  const resetAllFilters = (event: React.MouseEvent) => {
    event.preventDefault();
    setQuery('');
    setActiveFilter('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': activeFilter === '' })}
          href="#/people"
          onClick={handleSexFilter('')}
        >
          {FilterBy.All}
        </a>

        <a
          className={cn({ 'is-active': activeFilter === genderKeyMale })}
          href={`#/people?sex=${genderKeyMale}`}
          onClick={handleSexFilter(genderKeyMale)}
        >
          {GENDER_MAP[genderKeyMale]}
        </a>

        <a
          className={cn({ 'is-active': activeFilter === genderKeyFemale })}
          href={`#/people?sex=${genderKeyFemale}`}
          onClick={handleSexFilter(genderKeyFemale)}
        >
          {GENDER_MAP[genderKeyFemale]}
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
              onClick={handleCenturyAll}
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
};
