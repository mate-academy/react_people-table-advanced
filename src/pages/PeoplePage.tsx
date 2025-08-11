import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types/Person/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | null>(
    null,
  );
  const [loadError, setLoadError] = useState(false);

  const loadDataFromServer = async () => {
    try {
      const people = await getPeople();

      setPeopleFromServer(people);
    } catch {
      setLoadError(true);
    }
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  const preparedPeople = useMemo(
    () =>
      peopleFromServer?.map(human => {
        const { fatherName, motherName } = human;

        const person = {
          ...human,
        };

        if (fatherName) {
          const father = peopleFromServer.find(man => man.name === fatherName);

          if (father) {
            person.father = father;
          }
        }

        if (motherName) {
          const mother = peopleFromServer.find(
            woman => woman.name === motherName,
          );

          if (mother) {
            person.mother = mother;
          }
        }

        return person;
      }),
    [peopleFromServer],
  );

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
              {!preparedPeople && !loadError && <Loader />}

              {loadError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {preparedPeople && !preparedPeople?.length && !loadError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {preparedPeople?.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
