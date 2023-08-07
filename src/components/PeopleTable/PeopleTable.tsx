import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';
import { SortLink } from '../SortLink/SortLink';

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
  isNoMatchingPeople: boolean;
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
  isNoMatchingPeople,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];

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

      {!errorMessage && !isLoading && !people.length && !isNoMatchingPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {isNoMatchingPeople && (
        <p>There are no people matching the current search criteria</p>
      )}

      {!errorMessage && !isLoading && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableHeaders.map(header => (
                <SortLink
                  fieldName={header}
                  isActive={header.toLowerCase() === sort}
                  isDesc={!!order}
                />
              ))}
              {/* <th>
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
              </th> */}

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
