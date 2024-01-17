import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { PeopleFilters } from '../PeopleFIlter/PeopleFilters';
import { TableHead } from '../TableHead';
import { getNewPeople } from '../../helpers/getNewPeople';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const newPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          newPerson.mother = peopleFromServer
            .find(p => p.name === person.motherName);

          newPerson.father = peopleFromServer
            .find(p => p.name === person.fatherName);

          return newPerson;
        });

        setPeople(newPeople);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const peopleToRender = getNewPeople(
    people,
    {
      centuries: searchParams.getAll('centuries') || [],
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
      sortField: searchParams.get('sort') as keyof Person || '',
      order: searchParams.get('order') || '',
    },
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {errorMessage
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
              {!loading && (peopleToRender.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) }
              {!loading && (people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <TableHead />
                  <tbody>
                    {peopleToRender.map(person => {
                      return (
                        <PersonInfo
                          person={person}
                          key={person.slug}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
