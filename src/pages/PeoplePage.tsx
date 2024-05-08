import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleContext } from '../store/PeopleContext';
import { getPeople } from '../api';
import { ErrorText } from '../types/ErrorText';
import { peopleWithParents } from '../utils/util';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/filter';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorText | ''>('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(newPeople => {
        if (newPeople.length === 0) {
          setError(ErrorText.noPeople);
        }

        setPeople(peopleWithParents(newPeople));
      })
      .catch(() => {
        setError(ErrorText.loadingFailed);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setPeople]);

  const displayPeople = !loading && !error;
  const displayedPeople = getFilteredPeople(people, searchParams);

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
              {loading && <Loader />}

              {error === ErrorText.loadingFailed && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorText.loadingFailed}
                </p>
              )}

              {error === ErrorText.noPeople && (
                <p data-cy="noPeopleMessage">{ErrorText.noPeople}</p>
              )}

              {error === ErrorText.noSearchResult && (
                <p>{ErrorText.noSearchResult}</p>
              )}

              {displayPeople && <PeopleTable people={displayedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
