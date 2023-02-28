import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import { filterPeople } from '../../utils/filterPeople';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug = '' } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  const handleLoadingPeople = async () => {
    try {
      const peoples = await getPeople();

      setPersons(peoples);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    handleLoadingPeople();
  }, []);

  const visiblePersons = useMemo(() => (
    filterPeople(persons, query, centuries, sex)
  ), [persons, query, centuries, sex]);

  if (!persons.length && isLoaded) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    !errorMessage
      ? (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  query={query}
                  centuries={centuries}
                  sex={sex}
                  onQueryChange={onQueryChange}
                />
              </div>

              <div className="column">
                <div className="box table-container">
                  {!isLoaded && <Loader />}

                  {isLoaded && (
                    <PeopleTable
                      persons={visiblePersons}
                      selectedSlug={slug}
                      sort={sort}
                      order={order}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )
      : (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )
  );
};
