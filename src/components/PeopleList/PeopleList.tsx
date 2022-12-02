import {
  FC, useMemo, useCallback, useState, useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { ModifiedPerson, Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { PeopleFilters } from '../PeopleFilter';
import { PeoplePage } from '../PeoplePage';
import { PeopleTable } from './PeopleTable';

export const PeopleList: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<ModifiedPerson[] | null>(null);
  // eslint-disable-next-line max-len
  const isNoPeople = useMemo(
    () => people?.length === 0 && !hasError && !isLoading,
    [people, hasError, isLoading],
  );
  const isPeople = useMemo(
    () => people?.length !== 0 && !hasError && !isLoading,
    [people, hasError, isLoading],
  );
  const { personLink = '' } = useParams();

  const findMother = useCallback((person: Person, peopleList: Person[]) => {
    return peopleList.find(human => human.name === person.motherName) || null;
  }, []);

  const findFather = useCallback((person: Person, peopleList: Person[]) => {
    return peopleList.find(human => human.name === person.fatherName) || null;
  }, []);

  const handlePeopleLoad = useCallback(async () => {
    try {
      const peopleListFromServer = await getPeople();
      const currentPeopleList = peopleListFromServer.map(person => {
        const mother = findMother(person, peopleListFromServer);
        const father = findFather(person, peopleListFromServer);
        const century = Math.ceil(person.born / 100).toString();

        return {
          ...person,
          father,
          mother,
          century,
        };
      });

      setIsLoading(false);
      setPeople(currentPeopleList);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    handlePeopleLoad();
  }, []);

  return (
    <div className="container">
      <PeoplePage />
      <div className="box table-container">

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {isNoPeople && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {isPeople
              && (
                <>
                  <div className="column is-7-tablet is-narrow-desktop">
                    <PeopleFilters />
                  </div>

                  <div className="column">

                    <PeopleTable
                      people={people}
                      personLink={personLink}
                    />
                  </div>

                </>
              )}
          </div>
        </div>
      </div>

    </div>
  );
};
