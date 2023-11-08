import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorLoad } from '../../components/ErrorLoad';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getDataFromServer = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const peopleFromServer = await getPeople();

      const personWithParents = peopleFromServer
        .map(person => {
          const mother = peopleFromServer
            .find(parent => parent.name === person.motherName);
          const father = peopleFromServer
            .find(parent => parent.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

      setPeople(personWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const content = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <ErrorLoad />;
    }

    if (people.length === 0 && !isLoading) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <PeopleTable people={people} />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {content()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
