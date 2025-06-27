import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../api';
import { Person, SortBy, SortOrder } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleProvider } from '../contexts';
import { applyFilters, applySort } from '../utils/helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [peopleLookup, setPeopleLookup] = useState<Map<string, Person>>(
    new Map(),
  );

  const { slug: personSlug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') as SortBy) || null;
  const order = (searchParams.get('order') as SortOrder) || null;

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then((data: Person[]) => {
        setPeople(data);

        const newLookup = new Map<string, Person>();

        data.forEach(p => {
          newLookup.set(p.name, p);
        });

        setPeopleLookup(newLookup);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const processedPeople = useMemo(() => {
    let currentPeople = applyFilters(people, searchParams);

    currentPeople = applySort(currentPeople, sortBy, order);

    return currentPeople;
  }, [people, searchParams, sortBy, order]);

  const peopleNotLoaded = !isLoading && !errorMessage && people.length === 0;

  const peopleLoaded =
    !isLoading && !errorMessage && processedPeople.length > 0;

  const peopleNotFound =
    !isLoading &&
    !errorMessage &&
    people.length > 0 &&
    processedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !errorMessage && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {peopleNotLoaded && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleLoaded && (
                <PeopleProvider peopleLookup={peopleLookup}>
                  <PeopleTable
                    people={processedPeople}
                    selectedPersonSlug={personSlug || null}
                    sortBy={sortBy}
                    order={order}
                  />
                </PeopleProvider>
              )}

              {peopleNotFound && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
