import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Arrows } from './Arrows';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface SortParams {
  sort: string | null;
  order?: string | null;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
interface PeopleTableProps {
  people: Person[];
  slug?: string;
  searchParams: URLSearchParams;
  toggleSortParams: (field: string) => SortParams;
  sort: string | null;
  order: string | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  slug,
  searchParams,
  toggleSortParams,
  sort,
  order,
}) => {
  const getPersonDataForLink = (
    name: string | null,
    allPeople: Person[],
  ): Person | null => {
    if (!name) {
      return null;
    }

    const foundPerson = allPeople.find(p => p.name === name);

    return foundPerson || null;
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
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...toggleSortParams('name'),
                  }),
                }}
                replace
              >
                <Arrows sort={sort} order={order} field={'name'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...toggleSortParams('sex'),
                  }),
                }}
                replace
              >
                <Arrows sort={sort} order={order} field={'sex'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...toggleSortParams('born'),
                  }),
                }}
                replace
              >
                <Arrows sort={sort} order={order} field={'born'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...toggleSortParams('died'),
                  }),
                }}
                replace
              >
                <Arrows sort={sort} order={order} field={'died'} />
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isFemale = person.sex === 'f';
          const mother = getPersonDataForLink(person.motherName, people);
          const father = getPersonDataForLink(person.fatherName, people);
          const isSelected = person.slug === slug;

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': isFemale,
                  })}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} className="has-text-danger" />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
