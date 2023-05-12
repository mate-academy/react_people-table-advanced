import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const { slug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: ev.currentTarget.value || null }),
    );
  };

  useEffect(() => {
    setIsLoaderShow(true);

    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        setError('');
        setIsLoaderShow(false);
      })
      .catch(() => {
        setError('Cannot load people');
        setIsLoaderShow(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              changeHandle={onQueryChange}
              searchParams={searchParams}
              centuries={centuries}
              sexQuery={sex}
              query={query}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {error ? (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  {error}
                </p>
              ) : (
                <>
                  {isLoaderShow ? (
                    <Loader />
                  ) : (
                    <PeopleTable
                      people={filterPeople(people, query, sex, centuries)}
                      currentElement={slug}
                      searchParams={searchParams}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
