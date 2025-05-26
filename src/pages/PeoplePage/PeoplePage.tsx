import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the person finding logic
  const getPersonByName = (name: string | null) =>
    name ? people.find(person => person.name === name) : null;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people.length === 0 && !isLoading && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && (
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
                {people.map(person => {
                  // Pre-calculate these values once per person
                  const mother = getPersonByName(person.motherName);
                  const father = getPersonByName(person.fatherName);
                  const isActive = person.slug === personSlug;
                  const isFemale = person.sex === 'f';

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug} // Better to use slug as key if available
                      className={isActive ? 'has-background-warning' : ''}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={isFemale ? 'has-text-danger' : ''}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td className={mother ? 'has-text-danger' : ''}>
                        {mother ? (
                          <Link
                            className="has-text-danger"
                            to={`/people/${mother.slug}`}
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
                        {father ? (
                          <Link to={`/people/${father.slug}`}>
                            {person.fatherName}
                          </Link>
                        ) : person.fatherName ? (
                          person.fatherName
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
