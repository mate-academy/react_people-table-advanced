import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../store/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { SortTypes } from '../types/SortTypes';

export const PeoplePage = () => {
  const { people, loading, errorMessage } = usePeople();
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const name = searchParams.get('name') || '';
  const century = useMemo(
    () => searchParams.getAll('century') || [],
    [searchParams],
  );

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    let updatedPeople = people;

    if (sex) {
      updatedPeople = updatedPeople.filter(person => person.sex === sex);
    }

    if (name.length > 0) {
      updatedPeople = updatedPeople.filter(person =>
        person.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (century.length > 0) {
      updatedPeople = updatedPeople.filter(person =>
        century.includes((1 + Math.trunc(person.born / 100)).toString()),
      );
    }

    return updatedPeople;
  }, [people, sex, name, century]);

  const sortedPeople = useMemo(() => {
    let updatedPeople = [...filteredPeople];

    if (sort === SortTypes.NAME || sort === SortTypes.SEX) {
      updatedPeople = updatedPeople.sort((a, b) => {
        if (order) {
          return b[sort].localeCompare(a[sort]);
        } else {
          return a[sort].localeCompare(b[sort]);
        }
      });
    }

    if (sort === SortTypes.BORN || sort === SortTypes.DIED) {
      updatedPeople = updatedPeople.sort((a, b) => {
        if (order) {
          return +b[sort] - +a[sort];
        } else {
          return +a[sort] - +b[sort];
        }
      });
    }

    return updatedPeople;
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              sex={sex}
              name={name}
              century={century}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                (filteredPeople.length > 0 ? (
                  <PeopleTable people={sortedPeople} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
