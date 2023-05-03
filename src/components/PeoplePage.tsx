import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SortType } from '../types/SortType';

const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
) => {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, fatherName, motherName } = person;
      const sumString = (name + fatherName + motherName).toLowerCase();

      return sumString.includes(query.toLowerCase().trim());
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100).toString())));
  }

  return visiblePeople;
};

const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  const sortedPeople = [...people];

  if (sort) {
    switch (sort) {
      case SortType.name:
      case SortType.sex:
        sortedPeople.sort((prev, next) => (
          prev[sort].localeCompare(next[sort])
        ));
        break;
      case SortType.born:
      case SortType.died:
        sortedPeople.sort((prev, next) => (
          prev[sort] - next[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personSlug = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !isLoading && !isError
              && (
                <PeopleFilters />
              )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && !people.length
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

              {!people.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {people.length > 0 && !isLoading && !isError
                && filteredPeople.length > 0
                && (
                  <PeopleTable
                    people={sortedPeople}
                    personSlug={personSlug}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
