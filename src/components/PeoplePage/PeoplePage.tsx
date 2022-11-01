import React, {
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api/api';
import { Title } from '../Title';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { ErrorNotification } from '../ErrorNotification';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';
import { Error } from '../../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleGetPeople = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const peopleList = await getPeople();

      setPeople(peopleList);
    } catch {
      setError(Error.GET_PEOPLE);
    } finally {
      setIsLoading(false);
    }
  };

  const getPeopleFilteredList = (peopleBaseList: Person[]) => {
    let filteredPeople = [...peopleBaseList];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const queryFilter = (param?: string | null) => {
        return param
          ? param.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      filteredPeople = filteredPeople.filter(
        person => queryFilter(person.name)
          || queryFilter(person.motherName)
          || queryFilter(person.fatherName),
      );
    }

    if (centuries.length > 0) {
      const formatCentury = (person: Person) => {
        return Math.ceil(person.born / 100).toString();
      };

      filteredPeople = filteredPeople.filter(
        person => centuries.includes(formatCentury(person)),
      );
    }

    return filteredPeople || null;
  };

  const visiblePeople = getPeopleFilteredList(people);

  useEffect(() => {
    handleGetPeople();
  }, []);

  useEffect(() => {
    if (!people.length) {
      setError(Error.NO_PEOPLE);
    } else {
      setError(null);
    }
  }, [people.length]);

  return (
    <>
      <Title
        title="People Page"
      />

      <div className="block">
        <div className="
          columns
          is-desktop
          is-flex-direction-row-reverse"
        >
          <div className="
            column
            is-7-tablet
            is-narrow-desktop"
          >
            {!isLoading
              && (
                <PeopleFilters />
              )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
              && <Loader />}

              {error
              && !isLoading
              && (
                <ErrorNotification
                  error={error}
                />
              )}

              {!error
              && !isLoading
              && !visiblePeople.length
              && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!error
              && !isLoading
              && visiblePeople.length > 0
              && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
