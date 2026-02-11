/* eslint-disable prettier/prettier */
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Loader } from './Loader';
import { SearchLink } from './SearchLink';

type Props = {
  visiblePeople: Person[];
  people: Person[];
  isLoading: boolean;
  error: boolean;
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  people,
  isLoading,
  error,
  sort,
  order,
}) => {
  const { slug } = useParams();

  function getSortParams(param: string) {
    if (param !== sort) {
      return { sort: param, order: null };
    }

    if (!order) {
      return { sort: param, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  function getSortIcon(param: string) {
    if (sort !== param) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  }

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading &&
          !error &&
          people.length > 0 &&
          visiblePeople.length === 0 && (
          <p>There are no people matching the current search criteria</p>
        )}

        {!isLoading && !error && visiblePeople.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink params={getSortParams('name')}>
                      <span className="icon">
                        <i className={`fas ${getSortIcon('name')}`} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={getSortParams('sex')}>
                      <span className="icon">
                        <i className={`fas ${getSortIcon('sex')}`} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={getSortParams('born')}>
                      <span className="icon">
                        <i className={`fas ${getSortIcon('born')}`} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={getSortParams('died')}>
                      <span className="icon">
                        <i className={`fas ${getSortIcon('died')}`} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {visiblePeople.map(person => {
                const mother =
                  people.find(
                    currentPerson => currentPerson.name === person.motherName,
                  ) || null;

                const father =
                  people.find(
                    currentPerson => currentPerson.name === person.fatherName,
                  ) || null;

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        <PersonLink person={mother} name={person.motherName} />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        <PersonLink person={father} name={person.fatherName} />
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
