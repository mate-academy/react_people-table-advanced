import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { PersonLink } from '../components/PersonLink';

function findPersonByName(name: string | null, people: Person[]) {
  return people.find(person => person.name === name);
}

export const PeoplePage = () => {
  const { personSlug } = useParams();
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="container">
        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {errorMessage !== '' && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                )}

                {people?.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <table
                    data-cy="peopleTable"
                    className="
                      table is-striped
                      is-hoverable
                      is-narrow is-fullwidth
                    "
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
                      {people?.map(person => {
                        const mother = findPersonByName(
                          person.motherName,
                          people,
                        );
                        const father = findPersonByName(
                          person.fatherName,
                          people,
                        );

                        return (
                          <tr
                            data-cy="person"
                            key={person.slug}
                            className={
                              person.slug === personSlug
                                ? 'has-background-warning'
                                : ''
                            }
                          >
                            <td>
                              <PersonLink person={person} />
                            </td>

                            <td>{person.sex}</td>
                            <td>{person.born}</td>
                            <td>{person.died}</td>
                            <td>
                              {mother ? (
                                <PersonLink person={mother} />
                              ) : person.motherName ? (
                                person.motherName
                              ) : (
                                '-'
                              )}
                            </td>
                            <td>
                              {father ? (
                                <PersonLink person={father} />
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
