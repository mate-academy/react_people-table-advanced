import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { SearchParam } from '../types/SearchParam';

function getFilteredPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
): Person[] {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
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

  return preparedPeople;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchParam.sex);
  const query = searchParams.get(SearchParam.query);
  const centuries = searchParams.getAll(SearchParam.centuries);
  const sortField = searchParams.get(SearchParam.sort);
  const order = searchParams.get(SearchParam.order);

  const preparedPeople = getFilteredPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

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
              {people.length
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
            {!isLoading && <PeopleFilters />}
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
