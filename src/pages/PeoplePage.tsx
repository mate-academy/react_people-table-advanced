import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SexType } from '../types/SexType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = people.map(person => {
    const father = people.find(p => p.name === person.fatherName) || null;
    const mother = people.find(p => p.name === person.motherName) || null;

    return { ...person, mother, father };
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = (searchParams.get('sex') as SexType) || SexType.All;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (newQuery.trim().length === 0) {
      const updatedParams = getSearchWith(searchParams, { query: null });

      setSearchParams(updatedParams);
    } else {
      const updatedParams = getSearchWith(searchParams, { query: newQuery });

      setSearchParams(updatedParams);
    }
  };

  const getCentury = (year: number): number => {
    const century = Math.floor(year / 100);

    return year % 100 === 0 ? century : century + 1;
  };

  const filteredPeople = preparedPeople
    .filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase())
      );
    })
    .filter(person => {
      if (sex === SexType.All) {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      const personCentury = getCentury(person.born);

      if (centuries.length === 0) {
        return true;
      }

      return centuries.includes(String(personCentury));
    })
    .sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name);
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person2.died - person2.died;
        default:
          return 0;
      }
    });

  if (order === 'desc') {
    filteredPeople.reverse();
  }

  const handleSort = (sortField: string) => {
    if (sort === sortField) {
      if (order) {
        const updatedParams = getSearchWith(searchParams, { sort: null, order: null });
        setSearchParams(updatedParams);

        return;
      }

      const updatedParams = getSearchWith(searchParams, { order: 'desc' });
      setSearchParams(updatedParams);

      return;
    }

    const updatedParams = getSearchWith(searchParams, { sort: sortField });
    setSearchParams(updatedParams);
  };

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
                handleQueryChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {preparedPeople.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}
                  {filteredPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      sort={sort}
                      order={order}
                      people={filteredPeople}
                      handleSort={handleSort}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
