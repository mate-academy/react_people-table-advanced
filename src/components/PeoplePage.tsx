import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  useEffect(() => {
    const getAllPersons = async () => {
      setIsLoading(true);

      try {
        const allPersons = await getPeople();

        setPeople(allPersons);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getAllPersons();
  }, []);

  const personsForRender = useMemo(() => {
    return people?.map(person => {
      const mother = people.find(p => p.name === person.motherName);
      const father = people.find(p => p.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });
  }, [people]);

  const filteredPeople = useMemo(() => {
    if (!personsForRender) {
      return [];
    }

    let result = personsForRender;

    if (query) {
      result = personsForRender.filter(
        person =>
          person.name.toLowerCase().includes(query.trim()) ||
          person.motherName?.toLowerCase().includes(query.trim()) ||
          person.fatherName?.toLowerCase().includes(query.trim()),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortBy as keyof Person];
        const bVal = b[sortBy as keyof Person];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortOrder === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
    }

    return result;
  }, [query, sex, centuries, sortBy, sortOrder, personsForRender]);

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

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!errorMessage &&
                !isLoading &&
                (personsForRender?.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable people={filteredPeople || []} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
