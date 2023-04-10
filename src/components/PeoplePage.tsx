import React, { useEffect, useMemo, useState } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PersonType, SortType } from '../types/Person';
import { getPeople } from '../api';

function filterPeople(
  people: PersonType[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): PersonType[] {
  let filtered = [...people];

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (query) {
    filtered = filtered.filter(person => {
      const { name, motherName, fatherName } = person;
      const chekingString = (name + motherName + fatherName).toLowerCase();

      return chekingString.includes(query.toLowerCase());
    });
  }

  if (centuries.length > 0) {
    const getCentury = (person: PersonType) => {
      return Math.ceil(person.born / 100).toString();
    };

    filtered = filtered.filter(person => (
      centuries.includes(getCentury(person))
    ));
  }

  return filtered;
}

function sortPeople(
  people: PersonType[],
  sort: string | null,
  order: string | null,
) {
  const sorted = [...people];

  if (sort) {
    switch (sort) {
      case SortType.Name:
      case SortType.Sex:
        sorted.sort((prevPerson, nextPerson) => (
          prevPerson[sort].localeCompare(nextPerson[sort])
        ));
        break;

      case SortType.Born:
      case SortType.Died:
        sorted.sort((prevPerson, nextPerson) => (
          prevPerson[sort] - nextPerson[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    sorted.reverse();
  }

  return sorted;
}

export const PeoplePage: React.FC = () => {
  const match = useMatch('people/:slug');
  const selectedPersonSlug = match?.params.slug;

  const [people, setPeople] = useState<PersonType[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const loadPeople = async () => {
    setIsPeopleLoading(true);
    try {
      const loadedPeople = await getPeople();

      if (loadedPeople.length === 0) {
        setIsNoPeople(true);
      } else {
        setPeople(loadedPeople);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
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
            {!isError && !isPeopleLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isError && isPeopleLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isPeopleLoading && filteredPeople.length <= 0 && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {filteredPeople.length > 0 && people.length !== 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedPersonSlug={selectedPersonSlug || 'no-slug'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
