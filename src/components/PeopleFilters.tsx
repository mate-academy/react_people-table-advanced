/* eslint-disable max-len */
import React, { useState } from 'react';
import { Person } from '../types';

interface Props {
  people: Person[];
  setVisiblePeople: (visiblePeople: Person[]) => void;
  visiblePeople: Person[];
}

export const PeopleFilters: React.FC<Props>
= ({ people, setVisiblePeople, visiblePeople }) => {
  // const [sexFilter, setSexFilter] = useState('All');
  // const [ceuntryFilter, setCeuntryFilter] = useState('All');
  const [value, setValue] = useState('');

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value.toLowerCase();

    setValue(inputValue);
    // eslint-disable-next-line max-len
    setVisiblePeople(people.filter((p) => p.name.toLowerCase().includes(inputValue)));
  };

  const handleSexFilterClick = (filter: string) => {
    if (filter === 'M') {
      setVisiblePeople(visiblePeople.filter((p) => p.sex === 'm'));
    } else if (filter === 'F') {
      setVisiblePeople(visiblePeople.filter((p) => p.sex === 'f'));
    } else {
      setVisiblePeople(people);
    }
  };

  const handleCeuntryFilter = (ceuntry: string) => {
    if (ceuntry === '16') {
      setVisiblePeople(visiblePeople.filter((p) => p.born >= 1500 && p.born < 1600));
    } else if (ceuntry === '17') {
      setVisiblePeople(visiblePeople.filter((p) => p.born >= 1600 && p.born < 1700));
    } else if (ceuntry === '18') {
      setVisiblePeople(visiblePeople.filter((p) => p.born >= 1700 && p.born < 1800));
    } else if (ceuntry === '19') {
      setVisiblePeople(visiblePeople.filter((p) => p.born >= 1800 && p.born < 1900));
    } else if (ceuntry === '20') {
      setVisiblePeople(visiblePeople.filter((p) => p.born >= 1900 && p.born < 2000));
    } else {
      setVisiblePeople(people);
    }
  };

  const handleResetAllFilters = () => {
    // setCeuntryFilter('All');
    // setSexFilter('All');
    setValue('');
    setVisiblePeople(people);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className="is-active"
          href="#/people"
          onClick={handleSexFilterClick('All')}
        >
          All
        </a>
        <a
          className=""
          href="#/people?sex=m"
          onClick={handleSexFilterClick('M')}
        >
          Male
        </a>
        <a
          className=""
          href="#/people?sex=f"
          onClick={handleSexFilterClick('F')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={value}
            onChange={handleSearch}
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
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
              onClick={handleCeuntryFilter('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
              onClick={handleCeuntryFilter('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
              onClick={handleCeuntryFilter('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
              onClick={handleCeuntryFilter('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
              onClick={handleCeuntryFilter('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={handleCeuntryFilter('All')}
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
          onClick={handleResetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
