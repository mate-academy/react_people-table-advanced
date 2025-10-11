import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useLocation } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isErrorMessageShow, setIsErrorMessageShow] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const query = params.get('query')?.toLowerCase() || '';
  const sex = params.get('sex') || '';
  const centuries = params.getAll('centuries');
  const sort = params.get('sort') as keyof Person;
  const order = params.get('order');

  useEffect(() => {
    setLoading(true);
    setIsErrorMessageShow(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsErrorMessageShow(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.toLowerCase().includes(query);
    const matchesSex = sex ? person.sex === sex : true;

    const personCentury = Math.floor(person.born / 100) + 1;
    const matchesCentury = centuries.length
      ? centuries.includes(String(personCentury))
      : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const fieldA = a[sort];
    const fieldB = b[sort];

    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      const result = fieldA.localeCompare(fieldB);

      return order === 'desc' ? -result : result;
    }

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return order === 'desc' ? fieldB - fieldA : fieldA - fieldB;
    }

    return 0;
  });

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
              {loading && <Loader />}

              {isErrorMessageShow && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isErrorMessageShow && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0 && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
