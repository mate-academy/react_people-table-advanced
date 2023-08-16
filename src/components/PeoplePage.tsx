import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

const peopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName) || null;
    const father = people.find(p => p.name === person.fatherName) || null;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPeople = async (): Promise<Person[]> => {
    try {
      setIsLoading(true);

      setIsError(false);
      const peopleData = await getPeople();

      return peopleData;
    } catch (error) {
      setIsError(true);

      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople().then(setPeople);
  }, []);

  const preparedPeople = useMemo(() => peopleWithParents(people), [people]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong.
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
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
              <PeopleTable people={preparedPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
