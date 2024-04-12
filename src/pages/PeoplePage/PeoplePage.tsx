import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoadingError } from '../../components/LoadingError';
import { PeopleFilters } from '../../components/PeopleFilters';
import { normalize } from '../../utils/stringManipulation';
import { Orders, SortKeys } from '../../types/sortTypes';
import { NoPeopleMessage } from '../../components/NoPeopleMessage';
import { NoVisiblePeople } from '../../components/NoVisiblePeople';

type FilterParams = {
  query: string;
  sex: string;
  centuries: string[];
};

const getFilteredPeople = (people: Person[], params: FilterParams) => {
  const { query, sex, centuries } = params;

  let peopleCopy = [...people];

  if (query) {
    peopleCopy = peopleCopy.filter(person => {
      const normalizedQuery = normalize(query);

      return (
        normalize(person.name).includes(normalizedQuery) ||
        normalize(person.fatherName ?? '-').includes(normalizedQuery) ||
        normalize(person.motherName ?? '-').includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    peopleCopy = peopleCopy.filter(person => {
      const centurie = Math.ceil(person.born / 100);

      return centuries.includes(String(centurie));
    });
  }

  return peopleCopy;
};

type SortParams = {
  order: string;
  sort: string;
};

const getSortedPeople = (people: Person[], params: SortParams) => {
  const { order, sort } = params;

  if (!sort) {
    return people;
  }

  const reverseMultiplier = order === Orders.Descending ? -1 : 1;

  return [...people].sort((a, b) => {
    switch (sort) {
      case SortKeys.Name:
      case SortKeys.Sex:
        return (
          reverseMultiplier * normalize(a.name).localeCompare(normalize(b.name))
        );
      case SortKeys.Born:
      case SortKeys.Died:
        return reverseMultiplier * (a[sort] - b[sort]);
      default:
        return 0;
    }
  });
};

export const PeoplePage = () => {
  const { selectedSlug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSexFilter = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries');
  const currentOrder = searchParams.get('order') || Orders.Ascending;
  const currentSort = searchParams.get('sort') || SortKeys.None;

  const filteredPeople = getFilteredPeople(people, {
    query: currentQuery,
    sex: currentSexFilter,
    centuries: currentCenturies,
  });

  const preparedPeople = getSortedPeople(filteredPeople, {
    order: currentOrder,
    sort: currentSort,
  });

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setIsFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
              {isFailed && <LoadingError />}
              {!people.length && !isLoading && !isFailed && <NoPeopleMessage />}
              {!!people.length &&
                !isLoading &&
                !isFailed &&
                !preparedPeople.length && <NoVisiblePeople />}
              {!isLoading && !isFailed && !!preparedPeople.length && (
                <PeopleTable
                  selectedSlug={selectedSlug}
                  people={preparedPeople}
                  peopleFromServer={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
