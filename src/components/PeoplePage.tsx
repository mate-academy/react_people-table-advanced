import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const normalizedQuery = query.trim().toLowerCase();

  const preparedPeople = people.filter(person => {
    if (!normalizedQuery) {
      return true;
    }

    const name = person.name.toLowerCase();
    const mother = (person.motherName || '').toLowerCase();
    const father = (person.fatherName || '').toLowerCase();

    return (
      name.includes(normalizedQuery) ||
      mother.includes(normalizedQuery) ||
      father.includes(normalizedQuery)
    );
  });

  const showFilters = !isLoading && !hasError && people.length > 0;
  const showNoPeople = !isLoading && !hasError && people.length === 0;
  const showNoMatches = showFilters && preparedPeople.length === 0;
  const showTable = showFilters && preparedPeople.length > 0;

  void sex;
  void centuries;
  void sort;
  void order;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
                <PeopleTable people={preparedPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
