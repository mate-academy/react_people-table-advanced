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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayPeopleTable = useMemo(() => {
    return !error && !loading && !!people.length;
  }, [error, loading, people]);

  const fetchPeople = () => {
    setError(false);
    setPeople([]);
    setLoading(true);
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
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!error && !loading && !people.length) && (
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
