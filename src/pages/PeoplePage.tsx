import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getSearchWith } from '../utils/searchHelper';
import { SortOption } from '../types/SortOption';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value.trim() }),
    );
  };

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
      case SortOption.Name:
      case SortOption.Sex:
        sortedPeople = sortedPeople
          .sort((personA, personB) => (personA[sort]
            .localeCompare(personB[sort]) * sortDirection));
        break;
      case SortOption.Born:
      case SortOption.Died:
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

  const showNoPeopleMessage = !isError && !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              centuries={centuries}
              query={query}
              sex={sex}
              onQueryChange={onQueryChange}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable
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
