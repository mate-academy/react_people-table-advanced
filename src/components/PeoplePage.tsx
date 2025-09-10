import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const { isLoading, errorMessage, people } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople: Person[] = (() => {
    let filtered = [...people];

    if (query) {
      const search = query.toLowerCase();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(search) ||
          (person.motherName ?? '').toLowerCase().includes(search) ||
          (person.fatherName ?? '').toLowerCase().includes(search),
      );
    }

    if (sex === 'm' || sex === 'f') {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      });
    }

    if (sort === 'name' || sort === 'sex') {
      filtered.sort((a, b) =>
        order ? b[sort].localeCompare(a[sort]) : a[sort].localeCompare(b[sort]),
      );
    }

    if (sort === 'died' || sort === 'born') {
      filtered.sort((a, b) => (order ? b[sort] - a[sort] : a[sort] - b[sort]));
    }

    return filtered;
  })();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!errorMessage && !isLoading && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!errorMessage && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!errorMessage && !isLoading && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
