import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setPeople(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(century => {
        const personCentury = Math.ceil(person.born / 100);

        return personCentury === Number(century);
      });

    return matchesQuery && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const multiplier = order === 'desc' ? -1 : 1;

    switch (sort) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'sex':
        return multiplier * a.sex.localeCompare(b.sex);
      case 'born':
        return multiplier * (a.born - b.born);
      case 'died':
        return multiplier * (a.died - b.died);
      default:
        return 0;
    }
  });

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p data-cy="peopleLoadingError">Something went wrong</p>;
  } else if (people.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else if (sortedPeople.length === 0) {
    content = <p>There are no people matching the current search criteria</p>;
  } else {
    content = <PeopleTable people={sortedPeople} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
