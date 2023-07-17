import { useEffect, useState } from 'react';
// import { useMatch } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
// import { PersonLink } from './PersonLink';
// import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);
  const [isNoPeopleMessage, setIsNoPeopleMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleVisible, setPeopleVisible] = useState<Person[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const findPerson = (personName: string | null, peopleData: Person[]) => {
    return peopleData.find(person => person.name === personName);
  };

  // const match = useMatch('/people/:slug');

  useEffect(() => {
    setIsDataLoading(true);
    getPeople()
      .then((res) => {
        setPeople(res.map(pers => ({
          ...pers,
          motherName: pers.motherName || '-',
          fatherName: pers.fatherName || '-',
          mother: findPerson(pers.motherName, res),
          father: findPerson(pers.fatherName, res),
        })));

        setPeopleVisible(res.map(pers => ({
          ...pers,
          motherName: pers.motherName || '-',
          fatherName: pers.fatherName || '-',
          mother: findPerson(pers.motherName, res),
          father: findPerson(pers.fatherName, res),
        })));

        if (!res) {
          setIsNoPeopleMessage(true);
        }

        // console.log(res);
      })
      .catch(() => {
        setIsPeopleLoadingError(true);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {/* {!isDataLoading && <PeopleFilters />} */}
          </div>

          <div className="column">
            <div className="box table-container">
              {isDataLoading && <Loader />}

              {isPeopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!peopleVisible && people && (
                <p>There are no people matching the current search criteria</p>
              )}

              {peopleVisible && !isDataLoading
                && <PeopleTable people={peopleVisible} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
