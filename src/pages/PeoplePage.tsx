import { PeopleFilters } from '../components/PeopleFilters';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { ErrorTypes, Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes>();
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage(ErrorTypes.none);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorTypes.peopleLoadingError))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const peopleList: Person[] = useMemo(() => {
    function getPersonMother(motherName: string | null) {
      if (!motherName) {
        return undefined;
      }

      return people.find(person => person.name === motherName);
    }

    function getPersonFather(fatherName: string | null) {
      if (!fatherName) {
        return undefined;
      }

      return people.find(person => person.name === fatherName);
    }

    return people.map(person => ({
      ...person,
      mother: getPersonMother(person.motherName),
      father: getPersonFather(person.fatherName),
    }));
  }, [people]);

  const visiblePeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let result = [...peopleList];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person => {
        const queryLower = query.trim().toLowerCase();

        return (
          person.name.toLowerCase().includes(queryLower) ||
          person.motherName?.toLowerCase().includes(queryLower) ||
          person.fatherName?.toLowerCase().includes(queryLower)
        );
      });
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(String(personCentury));
      });
    }

    if (sort) {
      result = [...result].sort((a, b) => {
        const aValue = a[sort as keyof Person];
        const bValue = b[sort as keyof Person];

        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'desc' ? bValue - aValue : aValue - bValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'desc'
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        return 0;
      });
    }

    return result;
  }, [peopleList, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && Boolean(people.length) && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorTypes.peopleLoadingError}
                </p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">{ErrorTypes.noPeopleMessage}</p>
              )}

              {!loading && Boolean(people.length) && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
