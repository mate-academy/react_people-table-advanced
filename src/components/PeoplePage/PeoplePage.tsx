/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { Person, Sex } from '../../types';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [sortSex, setSortSex] = useState<Sex>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [centuriesFilter, setCenturiesFilter] = useState<number[]>([]);

  const sexFilter = searchParams.get('sex');

  useEffect(() => {
    if (sexFilter === 'f' || sexFilter === 'm') {
      setSortSex(sexFilter);
    }
  }, []);

  const resetFilters = () => {
    setSortSex('');
    setSearchQuery('');
    setCenturiesFilter([]);
  };

  const toggleSexSort = (sort: Sex) => {
    setSortSex(sort);
  };

  const updateQuery = (query: string) => {
    setSearchQuery(query);

    if (query === '') {
      setSearchParams((params) => {
        params.delete('query');

        return params;
      });
    }
  };

  const updateCenturies = (century: number) => {
    if (century === 0) {
      setCenturiesFilter([]);

      return;
    }

    setCenturiesFilter(prev => {
      if (prev.includes(century)) {
        return prev.filter(cent => cent !== century);
      }

      return [...prev, century];
    });
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters
            toggleSortSex={toggleSexSort}
            updateCenturies={updateCenturies}
            updateQuery={updateQuery}
            resetFilters={resetFilters}
          />
        </div>
        <div className="column">
          <div className="box table-container">

            {/* <p data-cy="peopleLoadingError">Something went wrong</p> */}

            <PeopleTable
              people={people}
              setPeople={setPeople}
              sortSex={sortSex}
              searchQuery={searchQuery}
              centuriesFilter={centuriesFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
