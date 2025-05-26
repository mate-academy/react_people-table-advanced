import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { personSlug } = useParams();

  const findPerson = (name: string | null) =>
    people.find(person => person.name === name);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people.length === 0 && !loader && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loader && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={
                      person.slug === personSlug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td
                      className={
                        findPerson(person.motherName) ? 'has-text-danger' : ''
                      }
                    >
                      {findPerson(person.motherName) ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${findPerson(person.motherName)?.slug}`}
                        >
                          {person.motherName}
                        </Link>
                      ) : person.motherName ? (
                        person.motherName
                      ) : (
                        '-'
                      )}
                    </td>

                    <td>
                      {findPerson(person.fatherName) ? (
                        <Link
                          to={`/people/${findPerson(person.fatherName)?.slug}`}
                        >
                          {person.fatherName}
                        </Link>
                      ) : person.fatherName ? (
                        person.fatherName
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
