import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  useEffect(() => {
    if (!isError) {
      setIsLoading(true);
      getPeople()
        .then(result => {
          const personWithParents = result.map(person => {
            const modifiedPerson = { ...person };
            const mam = result.find(p => p.name === person.motherName);
            const dad = result.find(p => p.name === person.fatherName);

            if (mam) {
              modifiedPerson.mother = mam;
            }

            if (dad) {
              modifiedPerson.father = dad;
            }

            return modifiedPerson;
          });

          setPeople(personWithParents);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isError]);

  const filteredPeople = people.filter(person => {
    const sexMatch = !sex || person.sex === sex;
    const queryMatch =
      !query || person.name.toLowerCase().includes(query.toLowerCase());
    const personCentury = Math.ceil(person.born / 100);
    const centuriesMatch =
      !centuries ||
      centuries.some(century => century === personCentury.toString());

    return sexMatch && queryMatch && centuriesMatch;
  });

  const isNoFilter = !query && (!centuries || centuries.length === 0) && !sex;

  return (
    <main className="section">
      <div className="container">
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

                {people.length === 0 && !isError && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people.length > 0 && (
                  <PeopleTable people={isNoFilter ? people : filteredPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PeoplePage;
