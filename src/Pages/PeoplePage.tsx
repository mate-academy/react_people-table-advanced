import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { prepareDataFromServer } from '../utils/prepereDataFromServer';
import { PeopleFilters } from '../components/PeopleFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  let visiblePeople = [...people];

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  const getPeopleFromServer = async () => {
    try {
      setIsPeopleLoading(true);

      const peopleFromServer = await getPeople();

      setPeople(prepareDataFromServer(peopleFromServer));
      setIsPeopleLoading(false);
    } catch (error) {
      setIsError(true);
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  function centuryFromYear(year: number) {
    return Math.floor((year + 99) / 100);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const queryValue = query.toLowerCase();
      const dataToSearch = (person.name
        + person.motherName + person.fatherName).toLowerCase();

      if (dataToSearch.includes(queryValue)) {
        return person;
      }

      return null;
    });
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const personCenturie = centuryFromYear(person.died);

      if (centuries.find(c => +c === personCenturie)) {
        return person;
      }

      return null;
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => (
      person.sex === sex
    ));
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isPeopleLoading
              && (
                <PeopleFilters />
              )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isPeopleLoading
                ? <Loader />
                : (
                  <>
                    <p
                      data-cy="peopleLoadingError"
                      className={cn('has-text-danger', {
                        'is-hidden': !isError,
                      })}
                    >
                      Something went wrong
                    </p>

                    <p
                      data-cy="noPeopleMessage"
                      className={cn({
                        'is-hidden': !!people.length,
                      })}
                    >
                      There are no people on the server
                    </p>

                    {!!people.length
                      && (
                        <PeopleTable people={visiblePeople} />
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
