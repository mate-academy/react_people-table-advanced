import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';

function getPreparedPeople(people: Person[], searchParams: URLSearchParams) {
  let visiblePeople = [...people];

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personCentury);
    });
  }

  if (sort === 'name' || sort === 'sex') {
    visiblePeople = visiblePeople.sort((a, b) => {
      return a[sort].localeCompare(b[sort]);
    });
  }

  if (sort === 'born' || sort === 'died') {
    visiblePeople = visiblePeople.sort((a, b) => {
      return a[sort] - b[sort];
    });
  }

  if (order === 'desc') {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = getPreparedPeople(people, searchParams);

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

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !errorMessage &&
                people.length > 0 &&
                (visiblePeople.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={visiblePeople} selectedSlug={slug} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
