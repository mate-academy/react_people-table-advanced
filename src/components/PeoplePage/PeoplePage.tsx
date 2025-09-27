import { Person } from '../../types';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFetched = await getPeople();

      setPeople(peopleFetched);
      setErrorMessage(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const peopleFiltered =
    people?.filter(person => {
      const century = Math.ceil(person.born / 100);
      const matchesQuery =
        person.name.toLowerCase().includes(query) ||
        (person.motherName ?? '').toLowerCase().includes(query) ||
        (person.fatherName ?? '').toLowerCase().includes(query);
      const matchesSex = sexFilter === '' || person.sex === sexFilter;
      const matchesCentury =
        centuries.length === 0 || centuries.includes(century.toString());

      return matchesQuery && matchesSex && matchesCentury;
    }) || [];

  const finalPeople = peopleFiltered.sort((person1, person2) => {
    if (!sort) {
      return 0;
    }

    if (!person1 || !person2) {
      return 0;
    }

    const key = sort as keyof Person;
    const a = person1[key];
    const b = person2[key];

    if (typeof a === 'string' && typeof b === 'string') {
      return order === 'desc' ? b.localeCompare(a) : a.localeCompare(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return order === 'desc' ? b - a : a - b;
    }

    return 0;
  });

  if (isLoading) {
    return (
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!people || people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (finalPeople.length === 0) {
    return (
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
                <p>There are no people matching the current search criteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
              <PeopleTable people={finalPeople} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
