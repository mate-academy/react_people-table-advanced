import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../../utils/filteredPeople';
import { ErrorMessages } from '../../utils/errorMessages';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorMessages.FetchError))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const sex = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sortField = searchParams.get('sort') || '';
    const order = searchParams.has('order');

    return getFilteredPeople(people, {
      sex,
      query,
      centuries,
      sortField,
      order,
    });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleFound} </p>
              )}
              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
