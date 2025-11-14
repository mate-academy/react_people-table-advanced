import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import SexFilter from '../types/SexFilter';

type SortCallback = (personA: Person, personB: Person) => number;

type SortParams = {
  sort: string | null;
  order?: string | null;
};

const SORTERS: Record<string, SortCallback> = {
  name: (personA: Person, personB: Person) => {
    return personA.name.localeCompare(personB.name);
  },
  sex: (personA: Person, personB: Person) => {
    return personA.sex.localeCompare(personB.sex);
  },
  BroadcastChannel: (personA: Person, personB: Person) => {
    return personA.born - personB.born;
  },
  died: (personA: Person, personB: Person) => {
    return personA.died - personB.died;
  },
};

const getFilteredPeople = (
  people: Person[],
  {
    sex,
    query,
    centuries,
    sort,
    order,
  }: {
    sex: SexFilter;
    query: string;
    centuries: string[];
    sort: string | null;
    order: string | null;
  },
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    const sorter = SORTERS[sort];
    const sorted = [...filteredPeople].sort(sorter);

    filteredPeople = order === 'desc' ? sorted.toReversed() : sorted;
  }

  return filteredPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const sexFilter = (searchParams.get('sex') as SexFilter) || null;
  const query = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const prepareSortParams = (field: string): SortParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    if (order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field };
  };

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const aggregatedPeople = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            ({ name }) => name === person.motherName,
          ),
          father: peopleFromServer.find(
            ({ name }) => name === person.fatherName,
          ),
        }));

        setPeople(aggregatedPeople);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = getFilteredPeople(people, {
    sex: sexFilter,
    query,
    centuries: centuriesFilter,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {people?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {false && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  <PeopleTable
                    people={filteredPeople}
                    getSortLinkProps={prepareSortParams}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
