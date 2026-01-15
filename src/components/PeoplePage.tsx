import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useMemo } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const { loading, error, people } = useContext(PeopleContext);
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(q) ||
          person.motherName?.toLowerCase().includes(q) ||
          person.fatherName?.toLowerCase().includes(q),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = Math.ceil(person.born / 100);

        return centuries.includes(bornCentury.toString());
      });
    }

    if (sort) {
      result.sort((a, b) => {
        let valueA: string | number;
        let valueB: string | number;

        switch (sort) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;

          case 'sex':
            valueA = a.sex;
            valueB = b.sex;
            break;

          case 'born':
            valueA = a.born;
            valueB = b.born;
            break;

          case 'died':
            valueA = a.died ?? Infinity;
            valueB = b.died ?? Infinity;
            break;

          default:
            return 0;
        }

        let compareResult = 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          compareResult = valueA.localeCompare(valueB);
        } else {
          compareResult = Number(valueA) - Number(valueB);
        }

        return order === 'desc' ? -compareResult : compareResult;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  const showNoMatchingMessage =
    !loading && !error && people.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchingMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {/* eslint-disable @typescript-eslint/indent */}

              {!loading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length > 0 &&
                !showNoMatchingMessage && (
                  <PeopleTable
                    people={filteredPeople}
                    personSlug={personSlug}
                  />
                )}

              {/* eslint-enable @typescript-eslint/indent */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
