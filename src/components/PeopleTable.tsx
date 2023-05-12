import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { DescOrder } from '../types/SortTypes';
import { SortPeople } from '../utils/sortPeople';

interface Props {
  people: Person[],
  currentElement: string,
  searchParams: URLSearchParams,
}

const findParent = (
  parent: 'mother' | 'father', person: Person, people: Person[],
) => {
  return parent === 'mother'
    ? people.find(somePerson => somePerson.name === person.motherName)
    : people.find(somePerson => somePerson.name === person.fatherName);
};

export const PeopleTable: React.FC<Props> = ({
  people, currentElement, searchParams,
}) => {
  const order = searchParams.get('order') || '';
  const sortBy = searchParams.get('sort') || '';
  const getSearchParams = (param: string) => {
    if (sortBy === param && !order) {
      return { sort: param, order: DescOrder };
    }

    if (sortBy === param && order) {
      return { sort: null, order: null };
    }

    return { sort: param, order: null };
  };

  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    to={{
                      search: getSearchWith(searchParams,
                        getSearchParams('name')),
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortBy !== 'name',
                        'fa-sort-up': sortBy === 'name' && !order,
                        'fa-sort-down': sortBy === 'name' && order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getSearchWith(searchParams,
                        getSearchParams('sex')),
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortBy !== 'sex',
                        'fa-sort-up': sortBy === 'sex' && !order,
                        'fa-sort-down': sortBy === 'sex' && order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getSearchWith(searchParams,
                        getSearchParams('born')),
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortBy !== 'born',
                        'fa-sort-up': sortBy === 'born' && !order,
                        'fa-sort-down': sortBy === 'born' && order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getSearchWith(searchParams,
                        getSearchParams('died')),
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortBy !== 'died',
                        'fa-sort-up': sortBy === 'died' && !order,
                        'fa-sort-down': sortBy === 'died' && order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {SortPeople(people, sortBy, order).map(person => (
              <tr
                data-cy="person"
                key={person.name}
                className={classNames(
                  {
                    'has-background-warning': person.slug === currentElement,
                  },
                )}
              >
                <PersonLink person={person} />

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName ? (
                  <PersonLink
                    person={
                      findParent('mother', person, people)
                    }
                    personName={person.motherName}
                  />
                ) : (
                  <td>-</td>
                )}
                {person.fatherName ? (
                  <PersonLink
                    person={
                      findParent('father', person, people)
                    }
                    personName={person.fatherName}
                  />
                ) : (
                  <td>-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
