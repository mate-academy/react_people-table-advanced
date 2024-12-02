import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  function addParents(person: Person, peopleList: Person[]) {
    const mother = peopleList.find(p => p.name === person.motherName) || null;
    const father = peopleList.find(p => p.name === person.fatherName) || null;

    return {
      ...(mother ? { mother } : {}),
      ...(father ? { father } : {}),
    };
  }

  useEffect(() => {
    setIsLoading(true);
    setLoadingError(false);

    getPeople()
      .then(response => {
        const normalizedPeople = response.map((person: Person) => {
          return { ...person, ...addParents(person, response) };
        });

        setPeople(normalizedPeople);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(getCentury(person).toString()),
    );
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(p => {
      return [p.name, p.motherName || '', p.fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

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
              {isLoading && <Loader />}

              {!isLoading && loadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !loadingError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !loadingError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
