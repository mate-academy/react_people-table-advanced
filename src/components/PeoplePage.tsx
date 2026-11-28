import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isDescending = order === 'desc' ? true : false;

  const visiblePeople = people.filter(person => {
    return (
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const copyVisiblePeople = [...visiblePeople];

  const sortedPeople = copyVisiblePeople.sort((person1, person2) => {
    let result = 0;

    if (sort === 'name') {
      result = person1.name.localeCompare(person2.name);
    }

    if (sort === 'sex') {
      result = person1.sex.localeCompare(person2.sex);
    }

    if (sort === 'born') {
      result = person1.born - person2.born;
    }

    if (sort === 'died') {
      result = person1.died - person2.died;
    }

    return isDescending ? result * -1 : result;
  });

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  const hasPeople = !loading && !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-4-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && (
                <PeopleTable
                  people={sortedPeople}
                  selectedPerson={selectedPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
