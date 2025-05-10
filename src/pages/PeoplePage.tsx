import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Table/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then((serverPeople: Person[]) => {
        const relatives = serverPeople.map(person => {
          const fullPerson = { ...person };
          const { fatherName, motherName } = fullPerson;

          if (fatherName) {
            fullPerson.father = serverPeople.find(
              person1 => person1.name === fatherName,
            );
          }

          if (motherName) {
            fullPerson.mother = serverPeople.find(
              person2 => person2.name === motherName,
            );
          }

          return fullPerson;
        });

        setPeople(relatives);
      })
      .catch(error => {
        setIsError(true);
        /* eslint-disable no-console */
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasNoPeople = !isError && !isLoading && people.length === 0;

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
              <p>There are no people matching the current search criteria</p>

              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people.length > 0 && (
                <PeopleTable people={people} selectedSlug={selectedSlug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
