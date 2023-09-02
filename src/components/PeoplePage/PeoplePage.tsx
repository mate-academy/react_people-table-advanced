import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    preparedPeople = preparedPeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    preparedPeople = preparedPeople.filter(person => {
      return [
        person.name,
        person.motherName || '',
        person.fatherName || '',
      ]
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    preparedPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return person1[sortField].localeCompare(person2[sortField]);

        case 'born':
        case 'died':
          return person1[sortField] - person2[sortField];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      preparedPeople.reverse();
    }
  }

  const loadPeopleTable = (): JSX.Element => {
    return (
      <>
        {isError
          ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )
          : (
            <>
              {people.length > 0
                ? (
                  <PeopleTable people={preparedPeople} />
                )
                : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
            </>
          )}
      </>
    );
  };

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                loadPeopleTable()
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
