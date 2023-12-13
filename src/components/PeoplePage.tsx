import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [erroeMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');

  const queryIncludes = (str = '', person: Person) => {
    return (person.name.toLowerCase().includes(str)
      || person.fatherName?.toLowerCase().includes(str)
      || person.motherName?.toLowerCase().includes(str)
    );
  };

  const bornInCentury = (centuries: string[], person: Person) => {
    return (!centuries.length
      || centuries.includes(Math.ceil(person.born / 100).toString())
    );
  };

  const preparedPeople = useMemo(() => {
    const filtredAndSortedPeople = people.filter((person) => {
      const lowerQuery = query?.toLowerCase();

      return (
        (sex ? person.sex === sex : person)
        && queryIncludes(lowerQuery, person)
        && bornInCentury(century, person)
      );
    })
      .sort((person1, person2) => {
        switch (sort) {
          case 'Name':
            return person1.name.localeCompare(person2.name);
          case 'Sex':
            return person1.sex.localeCompare(person2.sex);
          case 'Born':
            return person1.born - person2.born;
          case 'Died':
            return person1.died - person2.died;

          default:
            return 0;
        }
      });

    if (order === 'desc') {
      filtredAndSortedPeople.reverse();
    }

    return filtredAndSortedPeople;
  }, [sex, query, century, order, people, sort]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              <p data-cy="peopleLoadingError">{erroeMessage}</p>

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {preparedPeople.length > 0 && !isLoading && (
                <PeopleTable
                  people={preparedPeople}
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
