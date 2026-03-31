import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PeopleLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: { people: Person[] }) => {
  const renderParent = (parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parentObject = people.find(person => parentName === person.name);

    if (parentObject) {
      return <PersonLink person={parentObject} />;
    } else {
      return parentName;
    }
  };

  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  function getSortParams(columnName: string): SearchParams {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  function getSortIcon(columnName: string) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== columnName) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  }

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
                  search: getSearchWith(searchParams, getSortParams('name')),
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('sex')),
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('born')),
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('died')),
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
