/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    async function getPeopleFromServer() {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    getPeopleFromServer();
  }, []);

  const filteredPeople = useMemo(() => {
    if (!people.length) {
      return [];
    }

    let result = people.map(person => {
      const mother = people.find(
        potentialMother => potentialMother.name === person.motherName,
      );
      const father = people.find(
        potentialFather => potentialFather.name === person.fatherName,
      );

      return {
        ...person,
        ...(mother && { mother }),
        ...(father && { father }),
      };
    });

    const currentSex = searchParams.get('sex');
    const currentQuery = searchParams.get('query')?.toLowerCase();
    const currentCenturies = searchParams.getAll('centuries');
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort && currentOrder) {
      result = result.sort((person1, person2) => {
        let sortValue = 0;

        const value1 = person1[currentSort as keyof Person];
        const value2 = person2[currentSort as keyof Person];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          sortValue = value1.localeCompare(value2);
        } else if (typeof value1 === 'number' && typeof value2 === 'number') {
          sortValue = value1 - value2;
        }

        return currentOrder === 'asc' ? sortValue : -sortValue;
      });
    }

    if (currentSex) {
      result = result.filter(person => person.sex === currentSex);
    }

    if (currentQuery) {
      result = result.filter(person => {
        return (
          person.name.toLowerCase().includes(currentQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(currentQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(currentQuery))
        );
      });
    }

    if (currentCenturies.length) {
      result = result.filter(person => {
        if (!person.born) {
          return false;
        }

        return currentCenturies.includes(String(Math.ceil(person.born / 100)));
      });
    }

    return result;
  }, [people, searchParams]);

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
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!loading &&
                !errorMessage &&
                !people.length &&
                Object.keys(searchParams).length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!loading &&
                !errorMessage &&
                !people.length &&
                Object.keys(searchParams).length > 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!errorMessage && !loading && people.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
