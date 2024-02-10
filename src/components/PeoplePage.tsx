import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getParent } from '../utils/getParent';
import { getPeople } from '../api';
import { Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';
  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';

  const preparedPeople: Person[] = people.map(person => {
    const mother = person.motherName
      ? getParent(person.motherName, people) : undefined;
    const father = person.fatherName
      ? getParent(person.fatherName, people) : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });

  const sortedPeople = [...preparedPeople].sort((a, b) => {
    switch (currentSort) {
      case Sort.Name:
      case Sort.Sex:
        return currentOrder === 'desc'
          ? b[currentSort].localeCompare(a[currentSort])
          : a[currentSort].localeCompare(b[currentSort]);
      case Sort.Born:
      case Sort.Died:
        return currentOrder === 'desc'
          ? b[currentSort] - a[currentSort]
          : a[currentSort] - b[currentSort];
      default:
        return 0;
    }
  });

  const filteringPeople = (peopleToFilter: Person[]) => {
    let filteredPeople = peopleToFilter;

    if (currentSex) {
      filteredPeople = filteredPeople.filter(person => {
        return person.sex === currentSex;
      });
    }

    if (currentQuery) {
      const normalizesQuery = currentQuery.toLowerCase();

      filteredPeople = filteredPeople.filter(person => {
        const result = [];

        result
          .push(person.name.toLowerCase().includes(normalizesQuery));

        if (person.motherName) {
          result
            .push(person.motherName.toLowerCase().includes(normalizesQuery));
        }

        if (person.fatherName) {
          result
            .push(person.fatherName.toLowerCase().includes(normalizesQuery));
        }

        return result.some(v => v);
      });
    }

    return filteredPeople;
  };

  const filteredPeople = filteringPeople(sortedPeople);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && (
                <>
                  {!filteredPeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {!!filteredPeople.length && (
                    <PeopleTable
                      people={filteredPeople}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
