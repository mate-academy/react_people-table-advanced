import { Loader } from './Loader';
import { PeopleTable } from './arrayList/list';
import { Person } from '../../types';
import { PeopleFilters } from '../Loader/PeopleFilters';
import '../../App.scss';

export enum Filter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}

interface Props {
  people: Person[];
  loading: boolean;
  errorMessage: boolean;
  setFilter: (filter: Filter) => void;
  filter: Filter;
  setTitleFilter: (titleFilter: string) => void;
  titleFilter: string;
  century: boolean[];
  setCentury: (century: boolean[]) => void;
}

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  errorMessage,
  setFilter,
  filter,
  setTitleFilter,
  titleFilter,
  century,
  setCentury,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block displayf">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <table
              data-cy="peopleTable"
              /* eslint-disable-next-line */
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <PeopleTable people={people} />
            </table>
          )}
        </div>
        <PeopleFilters
          setFilter={setFilter}
          filter={filter}
          setTitleFilter={setTitleFilter}
          titleFilter={titleFilter}
          century={century}
          setCentury={setCentury}
        />
      </div>
    </>
  );
};
