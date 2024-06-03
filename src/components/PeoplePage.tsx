import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  function Parent(parentName: string | null) {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName;
  }

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
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !errorMessage && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !isLoading && !errorMessage && (
                <PeopleTable people={people} slug={slug} Parent={Parent} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
