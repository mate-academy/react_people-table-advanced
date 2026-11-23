import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    setIsLoading(true);

    const loadPeople = async () => {
      try {
        const loadedPeople = await getPeople();
        const preparedPeople: Person[] = loadedPeople.map(person => ({
          ...person,
          mother: loadedPeople.find(m => m.name === person.motherName),
          father: loadedPeople.find(f => f.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length>0) {
    const getCentury = (person: Person) => Math.ceil(person.born/100);

    visiblePeople= visiblePeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
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
      switch(sortField) {
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
    
    if(isReversed) {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
