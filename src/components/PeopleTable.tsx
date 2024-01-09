import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from './Person/Person';
import { getPeople } from '../api';
import { Person as PersonType } from '../types/index';
import { Loader } from './Loader/Loader';
import { TableHeader } from './TableHeader';
import { filterPeople } from '../utils/filterPeople';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [peoples, setPeople] = useState<PersonType[]>([]);

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort') as keyof PersonType || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const findPersonByName = (name: string) => {
    const result = peoples.find(item => item.name === name);

    return result?.slug ? result.slug : '';
  };

  const preparedPeople = filterPeople(
    peoples,
    centuries,
    query,
    sex,
    sortField,
    order,
  );

  return (
    <>
      {
        !isLoading
          ? (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {peoples.length === 0
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : (
                  <table
                    data-cy="peopleTable"
                    className="
                      table
                      is-striped
                      is-hoverable
                      is-narrow
                      is-fullwidth"
                  >
                    <TableHeader />

                    <tbody>
                      {preparedPeople.map(person => {
                        return (
                          <Person
                            person={person}
                            key={person.slug}
                            findSlug={findPersonByName}
                          />
                        );
                      })}

                    </tbody>
                  </table>
                )}

            </>
          )
          : <Loader />
      }

    </>
  );
};
