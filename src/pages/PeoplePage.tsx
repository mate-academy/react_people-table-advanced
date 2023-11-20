import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { ColumnNames } from '../types/ColumnNames';

interface PeopleFilterOptions {
  people: Person[];
  sort: string;
  order: string;
  query: string;
  sex: string;
  centuries: Array<string>;
}

const getVisiblePeople = ({
  people,
  sort,
  order,
  query,
  sex,
  centuries,
}: PeopleFilterOptions) => {
  let visiblePeople = [...people].map(person => ({
    ...person,
    century: String(Math.ceil(person.born / 100)),
  }));

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(
      (person) => person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      (person) => person.sex === sex,
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(person.century)
    ));
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case ColumnNames.Name:
          return a.name.localeCompare(b.name);

        case ColumnNames.Sex:
          return a.sex.localeCompare(b.sex);

        case ColumnNames.Born:
          return a.born - b.born;

        case ColumnNames.Died:
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const loadPeople = async () => {
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (error) {
      setErrorMessage('Something went wrong');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isShowErrorMessage = !isLoading && !errorMessage && people.length === 0;

  const visiblePeople = getVisiblePeople({
    people,
    sort,
    order,
    query,
    sex,
    centuries,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isShowErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(visiblePeople.length === 0 && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
