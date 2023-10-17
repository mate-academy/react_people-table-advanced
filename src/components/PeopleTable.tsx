import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './personLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SortTypes } from '../types/sortParams';

type Props = {
  setSearchWith:(params: SearchParams) => void,
  people: Person[],
  allPeople: Person[],
  order: string,
  sort: string,
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({
  setSearchWith,
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

  const handleSortOrder = (
    event: React.MouseEvent<HTMLAnchorElement,
    MouseEvent>, sortOrder: string,
  ) => {
    if (order && sort === sortOrder) {
      setSearchWith({ sort: null, order: null });
      event.preventDefault();
    }
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
                onClick={(event) => handleSortOrder(event, SortTypes.Name)}
                params={{
                  order: (
                    (sort === SortTypes.Name && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: SortTypes.Name,
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Name),
                    'fa-sort-down': (order && sort === SortTypes.Name),
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
                onClick={(event) => handleSortOrder(event, SortTypes.Sex)}
                params={{
                  order: (
                    (sort === SortTypes.Sex && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: SortTypes.Sex,
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Sex),
                    'fa-sort-down': (order && sort === SortTypes.Sex),
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
                onClick={(event) => handleSortOrder(event, SortTypes.Born)}
                params={{
                  order: (
                    (sort === SortTypes.Born && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: SortTypes.Born,
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Born),
                    'fa-sort-down': (order && sort === SortTypes.Born),
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
                onClick={(event) => handleSortOrder(event, SortTypes.Died)}
                params={{
                  order: (
                    (sort === SortTypes.Died && !order)
                      ? 'desc'
                      : null
                  ),
                  sort: SortTypes.Died,
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Died),
                    'fa-sort-down': (order && sort === SortTypes.Died),
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
