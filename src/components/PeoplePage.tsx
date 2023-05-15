import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeaopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);

  const [isInPorcess, setIsInProcess] = useState<boolean>(false);
  const { slug = '' } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value.trim() }),
    );
  };

  useEffect(() => {
    setIsInProcess(true);

    const fetchPerson = async () => {
      try {
        const fetchedPerson = await getPeople();

        setPeople(fetchedPerson);
      } catch (innerError) {
        setError(true);
      } finally {
        setIsInProcess(false);
      }
    };

    setError(false);
    fetchPerson();
  }, []);

  const visiblePeople = useMemo(() => {
    const result: Person[] = [];

    people.forEach(person => {
      const { fatherName, motherName } = person;

      const father = fatherName
        ? people.find(p => p.name === fatherName)
        : undefined;

      const mother = motherName
        ? people.find(p => p.name === motherName)
        : undefined;

      result.push({
        ...person,
        father,
        mother,
      });
    });

    return result;
  }, [people]);

  const filtrForPeople = () => {
    const getCenturie = (date: number) => {
      return (Math.floor(date / 100) + 1).toString();
    };

    let filtered = visiblePeople;

    if (centuries.length !== 0) {
      filtered = filtered
        .filter((person) => centuries.includes(getCenturie(person.born)));
    }

    if (query) {
      const queryParts = query.toLowerCase().split(' ');

      filtered = filtered
        .filter((person) => queryParts
          .every((part) => person.name.toLowerCase().includes(part)));
    }

    if (sex) {
      filtered = filtered.filter((person) => person.sex === sex);
    }

    return filtered;
  };

  const sortPeople = (filteredPeople: Person[]) => {
    let sortedPeople = [...filteredPeople];
    let sortDirection = 1;

    if (sort && order) {
      sortDirection = -1;
    }

    switch (sort) {
      case 'name':
      case 'sex':
        sortedPeople = sortedPeople
          .sort((personA, personB) => (personA[sort]
            .localeCompare(personB[sort]) * sortDirection));
        break;
      case 'born':
      case 'died':
        sortedPeople = sortedPeople
          .sort((
            personA,
            personB,
          ) => (personA[sort] - personB[sort]) * sortDirection);
        break;
      default:
        break;
    }

    return sortedPeople;
  };

  const filterAndSortPeople = useCallback(() => {
    const filteredPeople = filtrForPeople();
    const sortedPeople = sortPeople(filteredPeople);

    return sortedPeople;
  }, [sort, query, sex, centuries, order]);

  const isAnyMatch = !isInPorcess && filterAndSortPeople().length === 0;
  const isAnyPeople = people.length === 0 && !isInPorcess;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isInPorcess
              && (
                <PeopleFilters
                  searchParams={searchParams}
                  centuries={centuries}
                  query={query}
                  sex={sex}
                  onQueryChange={onQueryChange}
                />
              )}
          </div>

          <div className="column">
            <div className="box table-container">
              {error
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

              {isAnyPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isAnyMatch && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isInPorcess
                ? <Loader />
                : (filterAndSortPeople().length > 0 && !isInPorcess) && (
                  <PeaopleTable
                    people={filterAndSortPeople()}
                    link={slug}
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
