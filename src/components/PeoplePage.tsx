import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  onLoad: () => Promise<Person[]>;
};

const filterAndSortPeople = (
  people: Person[],
  sex: string | null,
  centuries: string[],
  query: string | null,
  sort: string | null,
  order: string | null,
) => {
  let result = [...people];

  if (sex) {
    result = result.filter(item => item.sex === sex);
  }

  if (centuries.length > 0) {
    result = result.filter(item => {
      const personCentury = Math.ceil(item.born / 100).toString();

      return centuries.includes(personCentury);
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    result = result.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(normalizedQuery);
      const motherMatch = item.motherName
        ?.toLowerCase()
        .includes(normalizedQuery);
      const fatherMatch = item.fatherName
        ?.toLowerCase()
        .includes(normalizedQuery);

      return nameMatch || motherMatch || fatherMatch;
    });
  }

  if (sort) {
    result.sort((user1, user2) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
        case 'sex':
          comparison = user1[sort].localeCompare(user2[sort]);
          break;
        case 'born':
        case 'died':
          comparison = user1[sort] - user2[sort];
          break;
        default:
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }

  return result;
};

export const PeoplePage: React.FC<Props> = ({ onLoad }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    onLoad()
      .then((items: Person[]) => {
        setPeople(items);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onLoad]);

  const visiblePeople = useMemo(() => {
    return filterAndSortPeople(people, sex, centuries, query, sort, order);
  }, [people, sex, centuries, query, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <PeopleTable people={visiblePeople} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
