import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { slug: currentSlug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !!people.length && (
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
                {people.map((person) => {
                  const {
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = person;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={cn({
                        'has-background-warning': currentSlug === slug,
                      })}
                    >
                      <td
                        aria-label="none"
                      >
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {getParent(motherName) || '-'}
                      </td>
                      <td>{getParent(fatherName) || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!isLoading && !people.length && !isError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
