import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { Parameter } from '../types/Parameter';
import { Order } from '../types/Order';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people
    .filter(
      person =>
        person.name.toLocaleLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLocaleLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()),
    )
    .filter(person => {
      if (!sex) {
        return true;
      }

      return sex === person.sex;
    })
    .filter(person => {
      if (!centuries.length) {
        return true;
      }

      return centuries.includes(Math.ceil(person.born / 100).toString());
    })
    .sort((person1: Person, person2: Person): number => {
      let coefficient = 0;

      if (sort === Parameter.Name.toLowerCase()) {
        coefficient = person1.name.localeCompare(person2.name);
      } else if (sort === Parameter.Sex.toLowerCase()) {
        coefficient = person1.sex.localeCompare(person2.sex);
      } else if (sort === Parameter.Born.toLowerCase()) {
        coefficient = person1.born - person2.born;
      } else if (sort === Parameter.Died.toLowerCase()) {
        coefficient = person1.died - person2.died;
      }

      return order === Order.desc ? -coefficient : coefficient;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && <ErrorMessage />}

              {!isLoading &&
                !isError &&
                (people.length > 0 ? (
                  <PeopleTable people={filteredPeople} />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
