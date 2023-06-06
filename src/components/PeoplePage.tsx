import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  // const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const findPerson = (personName: string | null, array: Person[]) => {
    return array.find((people: Person) => people.name === personName);
  };

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const peopleData = await getPeople();

      setPeoples(peopleData.map(people => ({
        ...people,
        mother: findPerson(people.motherName, peopleData),
        father: findPerson(people.fatherName, peopleData),
        motherName: people.motherName || '-',
        fatherName: people.fatherName || '-',
      })));
    } catch {
      throw new Error('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const getCheckQuery = useCallback((str: string | null) => {
    return str?.toUpperCase().includes(query.toUpperCase().trim());
  }, [query]);

  const filteredPeoples = useMemo(() => {
    let prePeoples = [...peoples];

    if (query) {
      prePeoples = peoples.filter((person) => {
        const names = person.name + person.motherName + person.fatherName;

        return getCheckQuery(names);
      });
    }

    if (sex) {
      prePeoples = peoples.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      prePeoples = peoples.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    return prePeoples;
  }, [peoples, query, sex, centuries]);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && (
          <Loader />
        )}
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              centuries={centuries}
              sex={sex}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              {/* <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>

              <p>There are no people matching
              the current search criteria</p> */}

              <PeopleTable peoples={filteredPeoples} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
