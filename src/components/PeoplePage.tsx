import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const loadPersons = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const result = await getPeople();

      setPeople(result);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getCentury = (year: number) => String(Math.ceil(year / 100));

  const visiblePeople = [...people]
    .filter(person => {
      if (!query) {
        return true;
      }

      return [person.name, person.fatherName, person.motherName].some(value =>
        value?.toLowerCase().includes(query),
      );
    })
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        !centuries.length || centuries.includes(getCentury(person.born)),
    );
  const sortedPeople = [...visiblePeople].sort((a, b) => {
    let result;

    switch (sort) {
      case 'name':
        result = a.name.localeCompare(b.name);
        break;
      case 'sex':
        result = a.sex.localeCompare(b.sex);
        break;
      case 'born':
        result = a.born - b.born;
        break;
      case 'died':
        result = a.died - b.died;
        break;
      default:
        result = 0;
    }

    return order === 'desc' ? -result : result;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}

        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={slug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
