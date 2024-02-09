import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const sexFilter = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    const result = people
      .map(person => {
        const father = people.find(p => p.name === person.fatherName);
        const mother = people.find(p => p.name === person.motherName);

        return { ...person, father, mother };
      })
      .filter(person => (sexFilter === '' || person.sex === sexFilter))
      .filter(({ name, motherName, fatherName }) => {
        const lowerQuery = query.toLowerCase();

        if (name.toLowerCase().includes(lowerQuery)) {
          return true;
        }

        if (motherName?.toLowerCase().includes(lowerQuery)) {
          return true;
        }

        if (fatherName?.toLowerCase().includes(lowerQuery)) {
          return true;
        }

        return false;
      })
      .filter(person => {
        if (!centuries.length) {
          return true;
        }

        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      })
      .sort((person1, person2) => {
        switch (sortBy) {
          case SortBy.name:
          case SortBy.sex:
            return person1[sortBy].localeCompare(person2[sortBy]);

          case SortBy.born:
          case SortBy.died:
            return person1[sortBy] - person2[sortBy];

          default:
            return 0;
        }
      });

    if (order === 'desc') {
      result.reverse();
    }

    return result;
  }, [people, sexFilter, query, centuries, sortBy, order]);

  const isNoMatch = useMemo(() => {
    return (!!people.length
      && !preparedPeople.length && !isloading && !isError);
  }, [people, isloading, isError, preparedPeople]);

  const canShowTable = useMemo(() => {
    return (people && !isError && !isloading && !isNoMatch);
  }, [people, isloading, isError, isNoMatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isloading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isloading && <Loader />}

              {isError && !isloading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isloading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {canShowTable && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
