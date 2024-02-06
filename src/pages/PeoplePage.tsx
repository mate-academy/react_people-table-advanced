import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  function getPreparedList(initialPeople: Person[]) {
    const sort = searchParams.get('sort') as keyof Person;
    const order = searchParams.get('order');

    const filteredPeople = [...initialPeople].filter(person => {
      const century = person.born.toFixed(2).slice(0, 2);
      const sex = searchParams.get('sex');
      const centuries = searchParams.getAll('century');
      const query = searchParams.get('query')?.toLowerCase() || '';

      const matchSex = !sex || person.sex === sex;

      const matchCentury = !centuries?.length || centuries.includes(century);

      const matchQuery
        = person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase()?.includes(query);

      return matchQuery && matchSex && matchCentury;
    });

    const sorted = filteredPeople.sort((person1, person2) => {
      const value1 = person1[sort];
      const value2 = person2[sort];

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      return 0;
    });

    return order ? sorted.reverse() : sorted;
  }

  const filteredAndSortedPeople = getPreparedList(people);

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
              {loading
                ? (<Loader />)
                : (
                  <>
                    {errorMessage
                      ? (<p data-cy="peopleLoadingError">{errorMessage}</p>)
                      : (<PeopleTable people={filteredAndSortedPeople} />)}

                    {!people.length && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!filteredAndSortedPeople.length && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
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
