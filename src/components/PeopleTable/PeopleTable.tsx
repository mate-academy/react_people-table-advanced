import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonRow } from '../PersonRow';
import { Status } from '../../types/Status';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  status: Status;
  people: Person[] | null;
};

export const PeopleTable = ({ status, people }: Props) => {
  const [searchParams] = useSearchParams();

  /**
   *Function that toggle search based on param by ascending or descending order
   * @param sortType
   * @returns string{} | null
}
   */
  const toggleSorting = (sortType: string) => {
    let current = searchParams.get('sort');
    let order = searchParams.get('order');

    if (current === sortType && order === 'desc') {
      current = null;
      order = null;
    } else if (current !== sortType) {
      current = sortType;
      order = null;
    } else if (current === sortType) {
      order = 'desc';
    }

    return { sort: current || null, order: order || null };
  };

  return (
    <>
      {people?.length !== 0 && status === 'resolved' && (
        <table
          data-cy="peopleTable"
          className="
                    table
                    is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={toggleSorting('name')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={toggleSorting('sex')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={toggleSorting('born')}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={toggleSorting('died')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people?.map(person => {
              return (
                <PersonRow key={person.name} people={people} person={person} />
              );
            })}
          </tbody>
        </table>
      )}
      <div className="block">
        <div className="box table-container">
          {status === 'pending' && <Loader />}

          {status === 'rejected' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
