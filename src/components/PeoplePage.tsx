import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const normalizedQuery = (query || '').toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const matchesName = person.name.toLowerCase().includes(normalizedQuery);
    const matchesMother = person.motherName
      ?.toLowerCase()
      .includes(normalizedQuery);
    const matchesFather = person.fatherName
      ?.toLowerCase()
      .includes(normalizedQuery);
    const matchesQuery = matchesName || matchesMother || matchesFather;

    const matchesSex = sex ? person.sex === sex : true;

    const personCenture = Math.ceil(person.born / 100).toString();

    const matchesCenture =
      centuries.length === 0 || centuries.includes(personCenture);

    return matchesQuery && matchesSex && matchesCenture;
  });

  const sortedPeople = [...visiblePeople].sort((personA, personB) => {
    if (!sort) {
      return 0;
    }

    const valueA = personA[sort as keyof Person] || '';
    const valueB = personB[sort as keyof Person] || '';

    const sortResult = String(valueA).localeCompare(String(valueB));

    return order === 'desc' ? sortResult * -1 : sortResult;
  });

  useEffect(() => {
    setIsLoader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && !isLoader && error === '' && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
