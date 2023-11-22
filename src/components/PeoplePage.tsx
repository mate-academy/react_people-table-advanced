import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const getVisiblePeople = (
  people: Person[], {
    sex, centuries, query, sort, order,
  }: {
    sex: string,
    centuries: string[],
    query: string,
    sort: string | null,
    order: string | null,
  },
) => {
  let copiePeople = [...people];

  if (sex) {
    copiePeople = copiePeople.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        case '':
        default:
          return copiePeople;
      }
    });
  }

  if (centuries.length > 0) {
    copiePeople = copiePeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    copiePeople = copiePeople.filter(person => {
      return person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);
    });
  }

  if (sort) {
    copiePeople = copiePeople.sort((person1, person2): number => {
      switch (sort) {
        case 'name':
          return order
            ? person2.name.localeCompare(person1.name)
            : person1.name.localeCompare(person2.name);
        case 'sex':
          return order
            ? person2.sex.localeCompare(person1.sex)
            : person1.sex.localeCompare(person2.sex);
        case 'born':
          return order
            ? person2.born - person1.born
            : person1.born - person2.born;
        case 'died':
          return order
            ? person2.died - person1.died
            : person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  return copiePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personId } = useParams();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getVisiblePeople(people, {
    sex, centuries, query, sort, order,
  });

  const loadPeople = async () => {
    setIsPeopleLoading(true);

    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && !isPeopleLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && (<Loader />)}

              {errorMessage && !isPeopleLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isPeopleLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !isPeopleLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isPeopleLoading && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  personId={personId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
