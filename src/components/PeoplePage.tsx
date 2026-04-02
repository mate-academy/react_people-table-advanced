import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [filtered, setFiltered] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filter = [...people];

    if (query.trim() !== '') {
      filter = filter.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex !== 'all') {
      filter = filter.filter(person => person.sex === sex);
    }

    if (centuries.length !== 0) {
      filter = filter.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    switch (sort) {
      case 'name':
      case 'sex':
        filter = filter.sort((first, second) => {
          if (order === 'desc') {
            return second[sort].localeCompare(first[sort]);
          } else {
            return first[sort].localeCompare(second[sort]);
          }
        });
        break;

      case 'born':
      case 'died':
        filter = filter.sort((firstPerson, secondPerson) => {
          if (order === 'desc') {
            return secondPerson[sort] - firstPerson[sort];
          } else {
            return firstPerson[sort] - secondPerson[sort];
          }
        });
        break;

      default:
        break;
    }

    setFiltered(filter);
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <PeopleTable people={filtered} activeSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
