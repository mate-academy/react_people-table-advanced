import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { loading, errorMessage, people } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const personSex = searchParams.get('personSex');
  const query = searchParams.get('query');
  const century = searchParams.getAll('century');
  const sortField = searchParams.get('sort');
  const desc = searchParams.get('order') === 'desc';

  let visiblePeople = [...people];

  if (personSex) {
    visiblePeople = visiblePeople.filter(person => person.sex === personSex);
  }

  if (century.length) {
    visiblePeople = visiblePeople.filter(person =>
      century.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
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
  }

  if (desc) {
    visiblePeople = visiblePeople.reverse();
  }

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
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!!people.length && <PeopleTable people={visiblePeople} />}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
