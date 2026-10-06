import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../store/PeopleContext';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { people, status, loadPeople } = usePeople();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = (searchParams.get('query') ?? '').trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.motherName ?? '',
      person.fatherName ?? '',
    ].some(name => name?.toLowerCase().includes(query) ?? false);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return (!sex || person.sex === sex) && matchesQuery && matchesCentury;
  });

  const sortedPeople = [...visiblePeople].sort((left, right) => {
    let result = 0;

    switch (sort) {
      case 'name':
        result = left.name.localeCompare(right.name);
        break;
      case 'sex':
        result = left.sex.localeCompare(right.sex);
        break;
      case 'born':
        result = left.born - right.born;
        break;
      case 'died':
        result = left.died - right.died;
        break;
    }

    return order === 'desc' ? -result : result;
  });

  useEffect(() => {
    void loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {status === 'loading' && <Loader />}
        {status === 'error' && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {status === 'success' && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {status === 'success' && people.length > 0 && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {visiblePeople.length > 0 ? (
                  <PeopleTable people={sortedPeople} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
