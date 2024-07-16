/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { FilterTypes, SortTypes } from '../types/sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const centuriesSearch = searchParams.getAll('centuries') || [];
    let filteredPeople = [...people];

    searchParams.forEach((value, key) => {
      switch (key) {
        case FilterTypes.Centuries:
          filteredPeople = filteredPeople.filter(person =>
            centuriesSearch
              .map(item => +item)
              .includes(Math.ceil(person.died / 100)),
          );
          break;

        case FilterTypes.Search:
          filteredPeople = filteredPeople.filter(
            person =>
              person.name.toLowerCase().includes(value) ||
              person.fatherName?.toLowerCase().includes(value) ||
              person.motherName?.toLowerCase().includes(value),
          );
          break;

        case FilterTypes.Sex:
          filteredPeople = filteredPeople.filter(
            person => person.sex === value,
          );
          break;

        default:
          break;
      }

      switch (value) {
        case SortTypes.Name:
          filteredPeople.sort((a, b) => {
            return searchParams.get('order') === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          });
          break;

        case SortTypes.Sex:
          filteredPeople.sort((a, b) => {
            if (a.sex === 'f' && b.sex === 'm') {
              return -1;
            } else if (a.sex === 'm' && b.sex === 'f') {
              return 1;
            } else {
              return 0;
            }
          });
          break;

        case SortTypes.Born:
          filteredPeople.sort((a, b) => {
            if (a.sex === 'f' && b.sex === 'm') {
              return -1;
            } else if (a.sex === 'm' && b.sex === 'f') {
              return 1;
            } else {
              return 0;
            }
          });
          break;

        default:
          break;
      }
    });

    return filteredPeople;
  }, [people, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(data => {
        data.forEach(person => {
          const father = data.find(p => p.name === person.fatherName);
          const mother = data.find(p => p.name === person.motherName);

          if (father) {
            person.father = father;
          }

          if (mother) {
            person.mother = mother;
          }
        });

        return data;
      })
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !hasError && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
