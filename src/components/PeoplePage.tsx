import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople: Person[] | undefined = people?.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }
    if (query) {
      const q = query.toLowerCase();
      const nameMatch = person.name.toLowerCase().includes(q);
      const fatherMatch = person.fatherName?.toLowerCase().includes(q) ?? false;
      const motherMatch = person.motherName?.toLowerCase().includes(q) ?? false;

      if (!nameMatch && !fatherMatch && !motherMatch) {
        return false;
      }
    }
    const birthYear = person.born;
    if (!birthYear) return false;

    const personCentury = Math.floor((birthYear - 1) / 100) + 1;

    if (centuries.length > 0 && !centuries.includes(personCentury.toString())){
      return false;
    }

    return true;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people !== null && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : isLoading ? (
                <Loader />
              ) : filteredPeople?.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <PeopleTable people={filteredPeople} slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
