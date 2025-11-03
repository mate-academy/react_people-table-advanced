/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
        setFilteredPeople(loadedPeople);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filterByCenturies = (centuries: string[], person: Person) => {
    if (centuries.length === 0) {
      return true;
    }

    const getCentury = (year?: number) =>
      year && year > 0 ? Math.ceil(year / 100) : null;

    const bornCentury = getCentury(person.born);
    const diedCentury = getCentury(person.died);

    if (!bornCentury || !diedCentury) {
      return false;
    }

    // All centuries the person lived through
    const personCenturies: string[] = [];

    for (let c = bornCentury; c <= diedCentury; c++) {
      personCenturies.push(c.toString());
    }

    // Return true if any overlap
    return personCenturies.some(c => centuries.includes(c));
  };

  useEffect(() => {
    const filterParams = {
      query: searchParams.get('query'),
      sex: searchParams.get('sex'),
      centuries: searchParams.getAll('centuries'),
    };

    const newPeople = people.filter(person => {
      const matchesQuery =
        !filterParams.query ||
        person.name.toLowerCase().includes(filterParams.query.toLowerCase()) ||
        (person.motherName ?? '')
          .toLowerCase()
          .includes(filterParams.query.toLowerCase()) ||
        (person.fatherName ?? '')
          .toLowerCase()
          .includes(filterParams.query.toLowerCase());

      const matchesSex = !filterParams.sex || person.sex === filterParams.sex;

      const matchesCenturies =
        filterParams.centuries.length === 0 ||
        filterByCenturies(filterParams.centuries, person);

      return matchesQuery && matchesSex && matchesCenturies;
    });

    const sortParams = {
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
    };

    if (sortParams.sort) {
      const order = sortParams.order === 'desc' ? -1 : 1;

      switch (sortParams.sort) {
        case 'name':
          newPeople.sort((a, b) => a.name.localeCompare(b.name) * order);
          break;
        case 'sex':
          newPeople.sort((a, b) => a.sex.localeCompare(b.sex) * order);
          break;
        case 'born':
          newPeople.sort((a, b) => (a.born - b.born) * order);
          break;
        case 'died':
          newPeople.sort((a, b) => (a.died - b.died) * order);
          break;
      }
    }

    setFilteredPeople(newPeople);
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {people.length > 0 && <PeopleTable people={filteredPeople} />}

              {people.length === 0 && !errorMessage && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
