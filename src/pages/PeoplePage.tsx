import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const isSelectedPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let selectedPeople = [...people];

  if (query && query.trim()) {
    const newQuery = query.toLowerCase();

    selectedPeople = selectedPeople.filter(
      person =>
        person.name.toLowerCase().includes(newQuery) ||
        person.motherName?.toLowerCase().includes(newQuery) ||
        person.fatherName?.toLowerCase().includes(newQuery),
    );
  }

  if (sex && sex !== 'all') {
    selectedPeople = selectedPeople.filter(person => person.sex === sex);
  }

  if (centuries && centuries.length) {
    selectedPeople = selectedPeople.filter(person =>
      centuries.some(
        century =>
          +century * 100 - 100 <= person.born &&
          person.born <= +century * 100 - 1,
      ),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
        selectedPeople.sort((person1, person2) =>
          person1.name.toLowerCase().localeCompare(person2.name.toLowerCase()),
        );
        break;

      case 'born':
      case 'died':
        selectedPeople.sort(
          (person1, person2) => +person1[sort] - +person2[sort],
        );
        break;

      case 'sex':
        selectedPeople.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;
    }
  }

  if (order) {
    selectedPeople.reverse();
  }

  return selectedPeople;
};

export const PeoplePage = () => {
  const [tablePeople, setTablePeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState('');
  const [hasLoading, setHasLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      setHasLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setTablePeople(fetchedPeople);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setHasLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const filterPeople = isSelectedPeople(
    tablePeople,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!tablePeople.length && !hasLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasLoading && <Loader />}

              {!hasLoading && hasError && (
                <p data-cy="peopleLoadingError">{hasError}</p>
              )}

              {!tablePeople.length && !hasLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filterPeople.length && !hasLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!hasLoading && !!filterPeople.length && (
                <PeopleTable people={filterPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
