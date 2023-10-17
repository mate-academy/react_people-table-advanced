import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './personLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  allPeople: Person[],
  order: string,
  sort: string,
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  order,
  sort,
  searchParams,
}) => {
  const { personSlug } = useParams();

  const isPersonInList = (personName: string) => (
    allPeople.find(person => person.name === personName)
  );

  const getParent = (
    personParent: string,
  ) => {
    const parent = isPersonInList(personParent);

    return parent
      ? (
        <PersonLink
          person={parent}
          searchParams={searchParams}
          selectedPerson={personSlug}
        />
      )
      : personParent;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >

      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                onClick={(event) => (
                  (order && sort === 'name') && event.preventDefault()
                )}
                params={{
                  order: (
                    (sort === 'name' && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: 'name',
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === 'name'),
                    'fa-sort-down': (order && sort === 'name'),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                onClick={(event) => (
                  (order && sort === 'sex') && event.preventDefault()
                )}
                params={{
                  order: (
                    (sort === 'sex' && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: 'sex',
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === 'sex'),
                    'fa-sort-down': (order && sort === 'sex'),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                onClick={(event) => (
                  (order && sort === 'born') && event.preventDefault()
                )}
                params={{
                  order: (
                    (sort === 'born' && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: 'born',
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === 'born'),
                    'fa-sort-down': (order && sort === 'born'),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                onClick={(event) => (
                  (order && sort === 'died') && event.preventDefault()
                )}
                params={{
                  order: (
                    (sort === 'died' && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: 'died',
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === 'died'),
                    'fa-sort-down': (order && sort === 'died'),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
                searchParams={searchParams}
                selectedPerson={personSlug}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                ? getParent(person.motherName)
                : '-'}
            </td>
            <td>
              {person.fatherName
                ? getParent(person.fatherName)
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
