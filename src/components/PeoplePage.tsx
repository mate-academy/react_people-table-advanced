/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isShowingError, setIsShowingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const gender = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setIsShowingError(false);
    getPeople()
      .then(res => {
        setPeople(res.map(person => {
          return {
            ...person,
            mother: res.find(mom => mom.name === person.motherName),
            father: res.find(dad => dad.name === person.fatherName),
          };
        }));
        setIsLoading(false);
      })
      .catch(() => setIsShowingError(true));
  }, []);

  const getFilteredAndSortedPeople = () => {
    let filteredPeople = [...people];

    if (gender) {
      filteredPeople = filteredPeople.filter(person => person.sex === gender);
    }

    if (query && query !== '') {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          || person.mother?.name.toLowerCase().includes(query.toLowerCase())
          || person.father?.name.toLowerCase().includes(query.toLowerCase());
      }) || filteredPeople;
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(`${Math.ceil(person.born / 100)}`);
      });
    }

    switch (sortBy) {
      case 'name':
      case 'sex':
        filteredPeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;
      case 'born':
      case 'died':
        filteredPeople.sort((a, b) => a[sortBy] - b[sortBy]);
        break;
      default:
        return {
          filteredPeople,
          allPeople: people,
        };
    }

    if (order) {
      filteredPeople = filteredPeople.reverse();
    }

    return {
      filteredPeople,
      allPeople: people,
    };
  };

  const filteredAndSortedPeople = getFilteredAndSortedPeople();
  const isValidData = !isLoading && people && !isShowingError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isShowingError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!isShowingError && isLoading && <Loader />}

              {isValidData && filteredAndSortedPeople.filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {isValidData && filteredAndSortedPeople.filteredPeople.length !== 0 && (
                <PeopleTable people={filteredAndSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
