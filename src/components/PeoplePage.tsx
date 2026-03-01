import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const selectedPeople = slug;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex'); // '' / 'm' / 'f'
  const query = searchParams.get('query')?.toLowerCase() || '';

  const selectedCenturies = searchParams.getAll('centuries').map(Number); // [16,17,...]

  const filteredPeople = people.filter(p => {
    const matchesSex = !sex || p.sex === sex;
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.motherName || '').toLowerCase().includes(query) ||
      (p.fatherName || '').toLowerCase().includes(query);

    const matchesCentury =
      selectedCenturies.length === 0 || // если ничего не выбрано — все
      selectedCenturies.includes(Math.floor(p.born / 100) + 1);

    return matchesSex && matchesQuery && matchesCentury;
  });

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    setTimeout(() => {
      axios
        .get(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        )
        .then(res => {
          setPeople(res.data);
        })
        .catch(() => {
          setIsError(true);

          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, [navigate]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && (
              <PeopleFilters people={people} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && people.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  allPeople={people}
                  selectedPeople={selectedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
