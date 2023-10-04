import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { PeopleFilters } from '../../PeopleFilters';
import { SearchParam } from '../../../types/SearchParam';
import { SortParam } from '../../../types/SortParam';

function preparePeople(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
}

function filterPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter((person) => {
      const personCentury = Math.ceil(person.born / 100).toString(10);

      return centuries.includes(personCentury);
    });
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join(' ')
        .toLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortParam.Name:
        filteredPeople.sort((person1, person2) => {
          return person1.name.localeCompare(person2.name);
        });

        break;
      case SortParam.Sex:
        filteredPeople.sort((person1, person2) => {
          return person1.sex.localeCompare(person2.sex);
        });

        break;
      case SortParam.Born:
        filteredPeople.sort((person1, person2) => {
          return person1.born - person2.born;
        });

        break;
      case SortParam.Died:
        filteredPeople.sort((person1, person2) => {
          return person1.died - person2.died;
        });

        break;
      case SortParam.NoSort:
      default:
        break;
    }

    if (order === 'desc') {
      filteredPeople.reverse();
    }
  }

  return filteredPeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchParam.Sex);
  const query = searchParams.get(SearchParam.Query);
  const centuries = searchParams.getAll(SearchParam.Centuries);
  const sortField = searchParams.get(SearchParam.Sort);
  const order = searchParams.get(SearchParam.Order);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(preparePeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = filterPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  const isDisplayError = isError && !isLoading;
  const isNoPeopleFromServer = !people.length && !isLoading && !isError;
  const isPeopleFromServer = !!people.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isDisplayError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleFromServer && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
