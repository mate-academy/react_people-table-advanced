import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonRow } from '../PersonRow';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  people: Person[] | null;
};

export const PeopleTable = ({ status, people }: Props) => {
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
                  <a href="#/people?sort=name">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a href="#/people?sort=sex">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a href="#/people?sort=born&amp;order=desc">
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a href="#/people?sort=died">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
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
