import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person/Person';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../types/ErrorMessage';

type Params = {
  personSlug?: string;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug } = useParams<Params>();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        if (fetchedPeople.length === 0) {
          setErrorMessage(ErrorMessage.NoDataOnServer);
        } else {
          setPeople(fetchedPeople);
          setErrorMessage(null);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.LoadingIssue))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters isLoading={isLoading} />
          </div>

          <div className="column">
            <div className="box table-container">
              {errorMessage === ErrorMessage.LoadingIssue && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isLoading && <Loader />}

              {!isLoading &&
                !errorMessage &&
                (people && people.length > 0 ? (
                  <PeopleTable people={people} selectedPerson={personSlug} />
                ) : (
                  <p data-cy="noPeopleMessage">{errorMessage}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
