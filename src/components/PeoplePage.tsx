import { useEffect, useState } from 'react';
import React from 'react';
import { Person } from '../types';

import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let finalPeople: Person[] = [];

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        const peopleWithRelations = fetchedPeople.map(person => {
          const mother = fetchedPeople.find(
            p => p.name === person.motherName,
          ) as Person | undefined;
          const father = fetchedPeople.find(
            p => p.name === person.fatherName,
          ) as Person | undefined;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithRelations || []);
      })
      .catch(() => {
        setError('Failed to fetch people');
        // throw new Error('Failed to fetch people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  finalPeople = [...people];

  if (query) {
    finalPeople = finalPeople.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    finalPeople = finalPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    finalPeople = finalPeople.filter(person => {
      const year = person.born;
      const century = Math.ceil(year / 100);

      return centuries.includes(century.toString());
    });
  }

  let sortedPeople = [...finalPeople];

  if (sort) {
    switch (sort) {
      case 'name':
        sortedPeople = finalPeople.sort((a, b) =>
          order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        );
        break;
      case 'sex':
        sortedPeople = finalPeople.sort((a, b) =>
          order === 'asc'
            ? a.sex.localeCompare(b.sex)
            : b.sex.localeCompare(a.sex),
        );
        break;
      case 'born':
        sortedPeople = finalPeople.sort((a, b) =>
          order === 'asc' ? a.born - b.born : b.born - a.born,
        );
        break;
      case 'died':
        sortedPeople = finalPeople.sort((a, b) =>
          order === 'asc' ? a.died - b.died : b.died - a.died,
        );
        break;
      default:
        sortedPeople = finalPeople;
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && sortedPeople.length === 0 && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {sortedPeople.length !== 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
