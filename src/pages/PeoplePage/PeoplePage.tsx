import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filterPeople } from '../../utils/filterPeople';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { FILTER_KEYS } from '../../constants/constants';
import { ErrorMessages } from '../../constants/errors';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(FILTER_KEYS.QUERY) || '';
  const sex = searchParams.get(FILTER_KEYS.SEX);
  const centuries = searchParams.getAll(FILTER_KEYS.CENTURIES);
  const sort = searchParams.get(FILTER_KEYS.SORT);
  const order = searchParams.get(FILTER_KEYS.ORDER);

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const isErrorShowing = !people.length && !isLoading && !hasLoadingError;

  useEffect(() => {
    setIsLoading(true);
    setHasLoadingError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  const filteredPeople = filterPeople({
    preparedPeople,
    query,
    sex,
    centuries,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessages.LOADING_ERROR}
                </p>
              )}
              {!!people.length && <PeopleTable people={filteredPeople} />}
              {isErrorShowing && (
                <p data-cy="noPeopleMessage">{ErrorMessages.NO_PEOPLE_FOUND}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
