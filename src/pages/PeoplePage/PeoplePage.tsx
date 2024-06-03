import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.fatherName,
      person.motherName,
    ].some(name => name?.toLowerCase().includes(query.toLowerCase()));
    const matchesSex = sex ? person.sex === sex : true;
    const matchesCentury = centuries.length
      ? centuries.includes(Math.ceil(person.born / 100).toString())
      : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  //console.log(filteredPeople);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {/* <p>There are no people matching the current search criteria</p> */}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
