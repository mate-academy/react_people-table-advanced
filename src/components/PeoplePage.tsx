import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const letters = searchParams.getAll('letters') || [];
  const sort = searchParams.get('sort') || '';

  const order = searchParams.get('order') || '';

  const getPeoples = async () => {
    try {
      const loadePeople = await getPeople();

      setPeople(() => loadePeople);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoaded = !isLoading && people.length;

  useEffect(() => {
    getPeoples();
  }, [people]);

  const sortedWithPeople = (typeSort: string, peopleFiltered: Person[]) => {
    switch (typeSort) {
      case 'name':
        return peopleFiltered.sort((prev, next) => (
          prev.name.localeCompare(next.name)));

      case 'sex':
        return peopleFiltered.sort((prev, next) => (
          prev.sex.localeCompare(next.sex)));

      case 'born':
        return peopleFiltered.sort((prev, next) => (
          prev.born - next.born));

      case 'died':
        return peopleFiltered.sort((prev, next) => (
          prev.died - next.died));

      default:
        return peopleFiltered;
    }
  };

  const filterPeople = (array: Person[]) => {
    let newPeople = [...array];

    if (sex) {
      newPeople = newPeople.filter((person) => person.sex === sex);
    }

    if (query) {
      const isInTheList = (person: string | null) => {
        return person
          ? person.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      newPeople = newPeople.filter((person) => {
        return (
          isInTheList(person.name)
          || isInTheList(person.motherName)
          || isInTheList(person.fatherName)
        );
      });
    }

    if (letters.length) {
      newPeople = newPeople.filter((person) => {
        const personCentury = Math.ceil(person.born / 100).toString();

        return letters.includes(personCentury);
      });
    }

    return newPeople;
  };

  let peopleFiltered = filterPeople(people);

  if (sort) {
    peopleFiltered = sortedWithPeople(sort, peopleFiltered);
  }

  if (order) {
    peopleFiltered.reverse();
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

              {isLoaded && (
                <PeopleTable people={peopleFiltered} />
              )}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoaded && people.length)
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : ''}

              {!peopleFiltered.length && !isLoading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
