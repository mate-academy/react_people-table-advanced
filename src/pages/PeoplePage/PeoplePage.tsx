import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredPeople = (peopleToFIlter: Person[]) => {
    let filtered = [...peopleToFIlter];

    const query = searchParams.get('query')?.toLowerCase() || '';

    if (query) {
      filtered = filtered.filter(person => {
        const nameMatch = person.name.toLowerCase().includes(query);
        const motherMatch = person.motherName?.toLowerCase().includes(query);
        const fatherMatch = person.fatherName?.toLowerCase().includes(query);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    const sex = searchParams.get('sex');

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    const selectedCenturies = searchParams.getAll('centuries');

    if (selectedCenturies.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return selectedCenturies.includes(century);
      });
    }

    return filtered;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block is-flex">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="box table-container">
            {isLoading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !error && people.length > 0 && (
              <PeopleTable
                people={getFilteredPeople(people)}
                selectedPersonSlug={slug}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
