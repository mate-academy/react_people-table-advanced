import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage = () => {
  const { slug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErr, setHasErr] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((res) => setPeople(res.map(person => ({
        ...person,
        mother: res.find(individual => individual.name === person.motherName),
        father: res.find(individual => individual.name === person.fatherName),
      }))))
      .catch(() => setHasErr(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && !hasErr && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasErr && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !hasErr && !isLoading && (
                <PeopleTable
                  people={people}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
