import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { DESC_ORDER } from '../SORTING_ORDER';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortOption = searchParams.get('sort');
  const isOrderReversed = searchParams.get('order') === DESC_ORDER;
  let filteredPeople = [...people];

  const getCenturies = (born: number) => Math.ceil(born / 100).toString();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  if (query) {
    filteredPeople = filteredPeople.filter(person => (
      (person.name + person.motherName + person.fatherName)
        .toLowerCase()
        .includes(query.toLowerCase())
    ));
  }

  if (sex) {
    const formatedSex = sex.toLowerCase()[0];

    filteredPeople = filteredPeople.filter(
      person => person.sex === formatedSex,
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => (
      centuries.includes(getCenturies(person.born))
    ));
  }

  if (sortOption) {
    filteredPeople.sort((personA, personB) => {
      switch (sortOption) {
        case 'name':
        case 'sex':
          return personA[sortOption].localeCompare(personB[sortOption]);
        case 'born':
        case 'died':
          return personA[sortOption] - personB[sortOption];
        default:
          return 0;
      }
    });
  }

  if (isOrderReversed) {
    filteredPeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !error && people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && (
                !error && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}

              {!people.length && !filteredPeople.length
                ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
                : <PeopleTable people={filteredPeople} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
