import {
  memo,
  useState,
  Fragment,
  useEffect,
  ReactNode,
} from 'react';
import { PeopleFilters } from '../components/PeopleTable/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleData } from '../types';
import { getPeople } from '../api';
import { noPeopleError, serverError } from '../components/PeopleTable/Errors';
import { assignKeyByIndex } from '../utils/assignKey';
import './People.css';

export const PeoplePage = memo(() => {
  const [peopleData, setPeopleData] = useState<PeopleData>({
    people: [],
    centuries: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ReactNode[]>([]);

  useEffect(() => {
    setLoading(true);
    setErrors([]);
    getPeople()
      .then(peopleFromServer => {
        const centuries: string[] = [];
        let century: string;

        peopleFromServer.forEach(person => {
          century = Math.ceil(person.born / 100).toString();
          if (!centuries.includes(century)) {
            centuries.push(century);
          }
        });

        setPeopleData({
          people: peopleFromServer.map(person => ({
            ...person,
            mother: peopleFromServer
              .find(mother => mother.name === person.motherName),
            father: peopleFromServer
              .find(father => father.name === person.fatherName),
          })),
          centuries: centuries.sort(),
        });

        if (!peopleFromServer.length) {
          setErrors(prev => [...prev, noPeopleError]);
        }
      })
      .catch(() => {
        setErrors(prev => [...prev, serverError]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !!peopleData.people.length && (
              <PeopleFilters centuries={peopleData.centuries} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errors.map((error, i) => (
                <Fragment key={assignKeyByIndex('error', i)}>
                  {error}
                </Fragment>
              ))}

              {!loading && !!peopleData.people.length && (
                <PeopleTable setErrors={setErrors} people={peopleData.people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
