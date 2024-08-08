import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Errors } from '../types/Errors';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (errorMessage) {
        setError(Errors.load);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const addParentsToPeople = (ppl: Person[]) => {
    const updatedPeople = ppl.map(person => {
      const mother = ppl.find(prs => prs.name === person.motherName);
      const father = ppl.find(prs => prs.name === person.fatherName);

      const updatedPerson = { ...person };

      if (mother) {
        updatedPerson.mother = mother;
      }

      if (father) {
        updatedPerson.father = father;
      }

      return updatedPerson;
    });

    return updatedPeople;
  };

  const updatedPeople = addParentsToPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {error === Errors.load && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {Errors.load}
                </p>
              )}
              {updatedPeople.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">{Errors.noPeople}</p>
              )}
              {isLoading && <Loader />}
              {!isLoading && updatedPeople.length > 0 && (
                <PeopleTable people={updatedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
