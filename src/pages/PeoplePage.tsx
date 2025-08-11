import { useContext } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleTable/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { peopleContext } from '../context/PeopleContext';

const preparePeople = (
  list: Person[],
  sortBy: keyof Person,
  order: string,
  centuries: string[],
  query: string,
  sex: string,
): Person[] => {
  if (!(centuries || (sortBy && order))) {
    return list;
  }

  let copy = [...list];

  if (centuries.length) {
    copy = copy.filter(person => {
      const personCentury = Math.floor((person.born - 1) / 100) + 1;

      return centuries.includes(personCentury.toString());
    });
  }

  if (sortBy) {
    copy = copy.sort((person1, person2) => {
      const f1 = person1[sortBy];
      const f2 = person2[sortBy];

      if (typeof f1 === 'string' && typeof f2 === 'string') {
        return f1.localeCompare(f2);
      }

      if (typeof f1 === 'number' && typeof f2 === 'number') {
        return f1 - f2;
      }

      return 0;
    });
  }

  if (query) {
    copy = copy.filter(person => {
      const a = person.name.toLowerCase();
      const b = person.fatherName?.toLowerCase();
      const c = person.motherName?.toLowerCase();

      return a.includes(query) || b?.includes(query) || c?.includes(query);
    });
  }

  if (sex) {
    copy = copy.filter(person => person.sex === sex);
  }

  if (order === 'desc') {
    return copy.toReversed();
  }

  return copy;
};

export const PeoplePage: React.FC = () => {
  const { people, isLoading, errorMessage } = useContext(peopleContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const visiblePeople = preparePeople(
    people,
    sortBy as keyof Person,
    order,
    centuries,
    query,
    sex,
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
