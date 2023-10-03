import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../services/people';
import { getPeopleWithParents } from '../helper';

function hasNormalizedQuery(content: string, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  return content.toLowerCase().includes(normalizedQuery);
}

function filterPeopleByQuery(people: Person[], query: string) {
  if (!query) {
    return people;
  }

  return people.filter((person) => (
    hasNormalizedQuery(person.name, query)
    || hasNormalizedQuery(person.fatherName ?? '', query)
    || hasNormalizedQuery(person.motherName ?? '', query)
  ));
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState('');
  const [query, setQuery] = useState('');
  const { slug: selectedSlug } = useParams();

  const isShowTable = !isLoading && people.length > 0;
  const isPeople = !isLoading
    && !errorMassage
    && people.length === 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleList => {
        setPeople(getPeopleWithParents(peopleList));
      })
      .catch(() => setErrorMassage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = filterPeopleByQuery(people, query);

  const handleFilterCallBack = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              onChangeQuery={handleFilterCallBack}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isShowTable && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={selectedSlug}
                />
              )}

              {isPeople
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              <p>There are no people matching the current search criteria</p>

              {errorMassage && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  {errorMassage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
