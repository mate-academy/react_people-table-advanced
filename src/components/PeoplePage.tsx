import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useContext, useEffect, useMemo } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const {
    people,
    isLoading,
    errorMessage,
    setErrorMessage,
    setIsLoading,
    setPeople,
  } = useContext(PeopleContext);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setPeople([]);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setErrorMessage, setIsLoading, setPeople]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const normalizedQuery = query?.toLowerCase();

      filtered = filtered.filter(
        ({ name, motherName, fatherName }) =>
          name.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (gender) {
      filtered = filtered.filter(person => person.sex === gender);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(`${personCentury}`);
      });
    }

    return filtered;
  }, [query, people, gender, centuries]);

  const sortedPeople = useMemo(() => {
    const sorted = [...filteredPeople].sort(
      (personA: Person, personB: Person) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return personA[sort].localeCompare(personB[sort]);
          case 'born':
          case 'died':
            return personA[sort] - personB[sort];
          default:
            return 0;
        }
      },
    );

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sort, order]);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (errorMessage) {
    content = <p data-cy="peopleLoadingError">Something went wrong</p>;
  } else if (people.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else if (sortedPeople.length === 0) {
    content = <p>There are no people matching the current search criteria</p>;
  } else {
    content = <PeopleTable people={sortedPeople} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
