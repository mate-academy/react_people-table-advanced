import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const normalizedQuery = query?.toLowerCase() || '';

  const getOrder = (column: string) => {
    if (sort !== column) {
      return 'asc';
    }

    if (order === 'asc') {
      return 'desc';
    }

    return null;
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (!value) {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    setSearchParams(newParams);
  }

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(normalizedQuery) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(normalizedQuery)) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(normalizedQuery));

      if (normalizedQuery && !matchesQuery) {
        return false;
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      if (
        centuries.length > 0 &&
        !centuries.includes(Math.ceil(person.born / 100).toString())
      ) {
        return false;
      }

      return true;
    });
  }, [people, sex, centuries, normalizedQuery]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const copy = [...filteredPeople];

    copy.sort((a, b) => {
      const valueA = a[sort as keyof Person];
      const valueB = b[sort as keyof Person];

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB as string);
      }

      return (valueA as number) - (valueB as number);
    });

    if (order === 'desc') {
      copy.reverse();
    }

    return copy;
  }, [filteredPeople, sort, order]);

  if (loading) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </>
    );
  }

  if (people.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              value={query}
              handleQueryChange={handleQueryChange}
              selectedCenturies={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={sortedPeople}
                sort={sort}
                order={order}
                getOrder={getOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
