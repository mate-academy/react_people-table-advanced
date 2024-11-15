import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';

import { Errors } from '../types/Errors';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getCentury as getPersonCentury } from '../utils/getCentury';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setErrorMessage(Errors.wentWrong))
      .finally(() => setIsLoading(false));
  }, []);

  function getPreparedList() {
    const sexFilter = searchParams.get('sex');
    const queryFilter = searchParams.get('query');
    const centuryFilter = searchParams.getAll('centuries').map(cent => +cent);

    if (!sexFilter && !queryFilter && !centuryFilter.length) {
      return peopleFromServer;
    }

    let newPeopleList = [...peopleFromServer];

    if (sexFilter) {
      newPeopleList = newPeopleList.filter(person => person.sex === sexFilter);
    } else if (queryFilter) {
      newPeopleList.filter(
        person =>
          person.name.toLowerCase().includes(queryFilter) ||
          person.fatherName?.toLowerCase().includes(queryFilter) ||
          person.motherName?.toLowerCase().includes(queryFilter),
      );
    } else if (centuryFilter) {
      newPeopleList = newPeopleList.filter(person =>
        centuryFilter.includes(getPersonCentury(person.born)),
      );
    }

    return newPeopleList;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable peopleFromServer={getPreparedList()} />
              )}

              {errorMessage === Errors.wentWrong && (
                <p data-cy="peopleLoadingError">{Errors.wentWrong}</p>
              )}

              {errorMessage === Errors.noPeople && (
                <p data-cy="noPeopleMessage">{Errors.noPeople}</p>
              )}

              {errorMessage === Errors.noMatches && <p>{Errors.noMatches}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
