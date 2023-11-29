import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayPeopleTable = useMemo(() => {
    return !isError && !isLoading && !!people.length;
  }, [isError, isLoading, people]);

  const fetchPeople = () => {
    setIsError(false);
    setPeople([]);
    setIsLoading(true);
    getPeople()
      .then((data) => {
        const mappedPeople = data.map((person) => {
          const editedPerson = { ...person };
          const mother = data.find((p) => p.name === person.motherName);
          const father = data.find((p) => p.name === person.fatherName);

          if (mother) {
            editedPerson.mother = mother;
          }

          if (father) {
            editedPerson.father = father;
          }

          return editedPerson;
        });

        setPeople(mappedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

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

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isError && !isLoading && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {displayPeopleTable && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
