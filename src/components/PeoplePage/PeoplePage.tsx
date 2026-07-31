import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort === 'name') {
    visiblePeople.sort((a, b) => {
      if (order === 'desc') {
        return b.name.localeCompare(a.name);
      }

      return a.name.localeCompare(b.name);
    });
  }

  if (sort === 'sex') {
    visiblePeople.sort((a, b) => {
      if (order === 'desc') {
        return b.sex.localeCompare(a.sex);
      }

      return a.sex.localeCompare(b.sex);
    });
  }

  if (sort === 'born') {
    visiblePeople.sort((a, b) => {
      if (order === 'desc') {
        return b.born - a.born;
      }

      return a.born - b.born;
    });
  }

  if (sort === 'died') {
    visiblePeople.sort((a, b) => {
      if (order === 'desc') {
        return b.died - a.died;
      }

      return a.died - b.died;
    });
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(
            currentPerson => currentPerson.name === person.motherName,
          ),
          father: data.find(
            currentPerson => currentPerson.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length > 0 ? (
                <PeopleTable people={visiblePeople} slug={slug} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
