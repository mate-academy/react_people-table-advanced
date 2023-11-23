import { Loader } from '../components/Loader';
import { usePeople } from '../store/PeopleContext';
import { People } from '../components/People';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const {
    people,
    loading,
    errorMessage,
    sort,
    order,
    query,
    sex,
    centuries,
  } = usePeople();

  let filteredPeople = [...people];

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        filteredPeople.sort((a, b) => {
          return a[sort].localeCompare(b[sort]);
        });
        break;

      case 'born':
      case 'died':
        filteredPeople.sort((a, b) => {
          return a[sort] - b[sort];
        });
        break;

      default:
        throw new Error(
          'There are no people matching the current search criteria',
        );
    }
  }

  if (order) {
    filteredPeople.reverse();
  }

  if (sex) {
    filteredPeople = filteredPeople.filter((el) => el.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter((el) => {
      const lowerQuery = query.toLowerCase();

      return (
        el.name.toLowerCase().includes(lowerQuery)
        || el.fatherName?.toLowerCase().includes(lowerQuery)
        || el.motherName?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(el => {
      return centuries.includes(Math.ceil(el.born / 100).toString());
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !!filteredPeople.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && (
                <Loader />
              )}
              {!!filteredPeople.length && (
                <People people={filteredPeople} />
              )}
              {!loading && !filteredPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
