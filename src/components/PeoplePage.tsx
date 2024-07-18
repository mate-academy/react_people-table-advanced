import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

function assignParents(people: Person[]) {
  return people.map(copyPerson => {
    const father = people.find(person => person.name === copyPerson.fatherName);
    const mother = people.find(person => person.name === copyPerson.motherName);

    return {
      ...copyPerson,
      father,
      mother,
    };
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleWithParents = assignParents(data);

        setPeople(peopleWithParents);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  const handlePersonClick = (slug: string) => {
    setSelectedSlug(slug);
  };

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
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p className="has-text-danger" data-cy="peopleLoadingError">
                  {error}
                </p>
              ) : people.length !== 0 ? (
                <PeopleTable
                  people={people}
                  selectedSlug={selectedSlug}
                  onPersonClick={handlePersonClick}
                />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
