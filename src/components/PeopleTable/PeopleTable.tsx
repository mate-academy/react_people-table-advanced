import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
  selectedSlug,
}) => {
  return (

    <div className="box table-container">
      {isLoading && (
        <Loader />
      )}

      {errorMessage && !isLoading && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {!errorMessage && !isLoading && !people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!errorMessage && !isLoading && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
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
            {people.map(person => (
              <PersonInfo
                person={person}
                people={people}
                selectedSlug={selectedSlug}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
