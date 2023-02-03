import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getParents } from '../utils/getParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const filterByQuery = (person: Person) => {
    const queryCaseIns = RegExp(query, 'i');

    return queryCaseIns.test(person.name)
    || queryCaseIns.test(person.motherName || '')
    || queryCaseIns.test(person.fatherName || '');
  };

  const filterByCentury = (person: Person) => (
    centuries.length
      ? centuries.includes(Math.ceil(person.born / 100).toString())
      : true
  );

  const filterBySex = (person: Person) => (
    sex ? person.sex === sex : true
  );

  const visiblePeople = people.filter(person => (
    filterBySex(person)
    && filterByQuery(person)
    && filterByCentury(person)
  ));

  const fetchPeople = () => {
    setLoading(true);
    getPeople()
      .then(response => {
        const peopleWithParents = response.map(person => ({
          ...person,
          ...getParents(person, response),
        }));

        setPeople(peopleWithParents);
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
        {isLoading
          ? <Loader />
          : ((
            hasError && (
              <p data-cy="peopleLoadingError">
                Something went wrong
              </p>
            )
          )
          || (
            !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          ))}
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {!visiblePeople.length
                ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
                : (
                  <PeopleTable
                    people={visiblePeople}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
