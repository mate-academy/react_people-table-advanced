import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import {
  FEMALE_SEX,
  MALE_SEX,
  ONE_CENTURY,
} from '../utils/variables';
import { PeopleSortType } from '../utils/PeopleSortType';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
): Person[] => {
  let PreparedPeople = [...people];

  if (sort) {
    switch (sort) {
      case PeopleSortType.Name:
      case PeopleSortType.Sex:
        PreparedPeople = PreparedPeople
          .sort((a, b) => a[sort].localeCompare(b[sort]));
        break;
      case PeopleSortType.Born:
      case PeopleSortType.Died:
        PreparedPeople = PreparedPeople
          .sort((a, b) => a[sort] - b[sort]);
        break;
      default:
        return PreparedPeople;
    }
  }

  if (order) {
    PreparedPeople = PreparedPeople.reverse();
  }

  if (centuries.length > 0) {
    PreparedPeople = PreparedPeople.filter(person => {
      const getCentury = Math.ceil(person.born / ONE_CENTURY);

      return centuries.includes(`${getCentury}`);
    });
  }

  if (query) {
    PreparedPeople = PreparedPeople.filter(person => {
      const preparedTitle = person.name.trim().toLowerCase();
      const preparedQuery = query.trim().toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  if (sex) {
    PreparedPeople = PreparedPeople.filter(person => {
      switch (sex) {
        case FEMALE_SEX:
          return person.sex === FEMALE_SEX;
        case MALE_SEX:
          return person.sex === MALE_SEX;
        default:
          return person;
      }
    });
  }

  return PreparedPeople;
};

export const PeoplePage = () => {
  const [newPeople, setNewPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        return people.map(person => {
          const mother = people
            .find(({ name }) => name === person.motherName);

          const father = people
            .find(({ name }) => name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });
      })
      .then(setNewPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isDisplayErrorMessage = isError && !isLoading;

  const isNoPeopleOnServer = !newPeople.length && !isLoading && !isError;

  const isPeopleOnServer = !!newPeople.length && !isError;

  const visiblePeople = getPreparedPeople(
    newPeople,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isPeopleOnServer && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isDisplayErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleOnServer && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
