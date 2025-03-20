import { PeopleFilters } from '../../../components/PeopleFilters';
import { Loader } from '../../../components/Loader';
import { PeopleTable } from '../../../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../../api';
import { Person } from '../../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setLoading(true);
    getPeople()
      .then(r => setPeople(r))
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const addedParents = useMemo(() => {
    if (!people) {
      return people;
    }

    return people.map(person => {
      const mother = people.find(p => p.name === person.motherName);
      const father = people.find(p => p.name === person.fatherName);

      const result = { ...person };

      if (mother) {
        result.mother = mother;
      }

      if (father) {
        result.father = father;
      }

      return result;
    });
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {!loading && (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {addedParents && addedParents.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {addedParents && addedParents.length > 0 && (
                    <PeopleTable people={addedParents} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
