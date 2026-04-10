import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

const getNextSortParams = (
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) => {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder === 'desc') {
    return { sort: null, order: null };
  }

  return { sort: field, order: 'desc' };
};

const getSortIcon = (
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) => {
  if (currentSort !== field) {
    return 'fa-sort';
  }

  return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
};

export const PeopleTable = ({ people, selectedPersonSlug }: Props) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const search = location.search;

  const renderRelativeLink = (name: string | null, peopleList: Person[]) => {
    if (!name) {
      return '-';
    }

    const person = peopleList.find(item => item.name === name);

    if (!person) {
      return name;
    }

    return (
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={{ pathname: `/people/${person.slug}`, search }}
      >
        {person.name}
      </Link>
    );
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
                params={getNextSortParams(currentSort, currentOrder, 'name')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIcon(currentSort, currentOrder, 'name')}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getNextSortParams(currentSort, currentOrder, 'sex')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIcon(currentSort, currentOrder, 'sex')}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getNextSortParams(currentSort, currentOrder, 'born')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIcon(currentSort, currentOrder, 'born')}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getNextSortParams(currentSort, currentOrder, 'died')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIcon(currentSort, currentOrder, 'died')}`}
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
        {people.map(person => {
          const isSelected = selectedPersonSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={{ pathname: `/people/${person.slug}`, search }}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderRelativeLink(person.motherName, people)}</td>
              <td>{renderRelativeLink(person.fatherName, people)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
