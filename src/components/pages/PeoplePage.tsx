import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { ErrorNotification } from '../../types/ErrorNotification';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { FilterNames, PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../../types/SexFilter';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorNotification | null>(null);

  const sex = searchParams.get(FilterNames.Sex) || SexFilter.All;
  const query = searchParams.get(FilterNames.Query) || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorNotification.LoadError))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeopleList = people
    .filter(person => {
      switch (sex) {
        case SexFilter.Male:
          return person.sex === SexFilter.Male;
        case SexFilter.Female:
          return person.sex === SexFilter.Female;
        case SexFilter.All:
        default:
          return true;
      }
    })
    .filter(({ name, fatherName, motherName }) => {
      return (
        name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        fatherName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        motherName?.toLowerCase()?.includes(query?.toLowerCase())
      );
    });

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
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorNotification.LoadError}
                </p>
              )}
              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">{ErrorNotification.NoPeople}</p>
              )}
              {!isLoading && !error && people.length && (
                <PeopleTable people={filteredPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
