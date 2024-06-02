import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import {
  PeopleFilterParams,
  PeopleSortParams,
  Person,
  SortValues,
} from '../types';
import { useSearchParams } from 'react-router-dom';
import { getCentury } from '../utils';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const query = searchParams.get(PeopleFilterParams.Query);
  const sex = searchParams.get(PeopleFilterParams.Sex);
  const centuries = searchParams.getAll(PeopleFilterParams.Centuries);
  const sort = searchParams.get(PeopleSortParams.Sort);
  const order = searchParams.get(PeopleSortParams.Order);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleMap = new Map(people.map(person => [person.name, person]));

  const visiblePeople = ((): Person[] => {
    let peopleCopy = people.slice();

    if (query) {
      const queryNormalize = query.toLocaleLowerCase().trim();

      peopleCopy = peopleCopy.filter(
        ({ name, fatherName, motherName }) =>
          name.toLowerCase().includes(queryNormalize) ||
          fatherName?.toLowerCase().includes(queryNormalize) ||
          motherName?.toLowerCase().includes(queryNormalize),
      );
    }

    if (sex) {
      peopleCopy = peopleCopy.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      peopleCopy = peopleCopy.filter(({ born }) =>
        centuries.includes(getCentury(born).toString()),
      );
    }

    if (sort) {
      peopleCopy.sort((a, b) => {
        const orderNumber = order ? -1 : 1;

        switch (sort) {
          case SortValues.Name:
          case SortValues.Sex:
            return a[sort].localeCompare(b[sort]) * orderNumber;
          case SortValues.Born:
          case SortValues.Died:
            return (a[sort] - b[sort]) * orderNumber;
          default:
            return 0;
        }
      });
    }

    return peopleCopy;
  })();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !isLoading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && !isLoading && !error && (
                <PeopleTable people={visiblePeople} peopleMap={peopleMap} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
