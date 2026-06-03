import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

function preparePeople(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
  sort: string,
  sortOrder: string,
) {
  const queryPeople = people.filter(person => {
    const fixedQuery = query.toLowerCase().trim();

    return (
      person.name.toLowerCase().includes(fixedQuery) ||
      person.fatherName?.toLowerCase().includes(fixedQuery) ||
      person.motherName?.toLowerCase().includes(fixedQuery)
    );
  });

  return queryPeople
    .filter(person => {
      const personCentury = Math.ceil(person.died / 100);

      if (sex && centuries.length !== 0) {
        return person.sex === sex && centuries.includes(String(personCentury));
      } else if (sex) {
        return person.sex === sex;
      } else if (centuries.length !== 0) {
        return centuries.includes(String(personCentury));
      } else {
        return true;
      }
    })
    .toSorted((person1, person2) => {
      if (!sort) {
        return 0;
      }

      const order = sortOrder === 'desc' ? -1 : 1;

      switch (sort) {
        case 'born':
        case 'died':
          return (person1[sort] - person2[sort]) * order;

        case 'sex':
        case 'name':
          return person1[sort].localeCompare(person2[sort]) * order;

        default:
          return 0;
      }
    });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const preparedPeople = preparePeople(
    people,
    query,
    centuries,
    sex,
    sort,
    order,
  );

  function loadPeople() {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters query={query} centuries={centuries} sex={sex} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && preparedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && preparedPeople.length !== 0 && (
                <PeopleTable
                  people={preparedPeople}
                  slug={slug ?? null}
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
