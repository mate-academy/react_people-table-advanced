import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  visiblePeople: Person[],
  personId?: string,
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  personId,
  people,
}) => {
  const [searchParams] = useSearchParams();

  const filteringType = ['Name', 'Sex', 'Born', 'Died'];

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const toggleSort = (column: string) => {
    let newParams = {};

    if (!sort) {
      newParams = { sort: column, order: null };
    }

    if (!order && sort === column) {
      newParams = { sort: column, order: 'desc' };
    }

    if (sort && sort !== column) {
      newParams = { sort: column, order: null };
    }

    if (sort && sort === column && order) {
      newParams = { sort: null, order: null };
    }

    return newParams;
  };

  const isPersonExistInList = (personName?: string | null) => {
    return people.find(person => person.name === personName);
  };

  const getParent = (person: Person, parentType: 'father' | 'mother') => {
    const parentTypeName = parentType === 'mother'
      ? 'motherName'
      : 'fatherName';

    if (!person[parentTypeName]) {
      return <td>-</td>;
    }

    const foundPerson = isPersonExistInList(person[parentTypeName]);

    if (foundPerson) {
      return (
        <td>
          <Link
            className={cn({
              'has-text-danger': foundPerson.sex === 'f',
            })}
            to={`/people/${foundPerson.slug}`}
          >
            {foundPerson.name}
          </Link>
        </td>
      );
    }

    return (
      <td>
        {person[parentTypeName]}
      </td>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {filteringType.map(column => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink
                  params={toggleSort(column.toLowerCase())}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sort !== column,
                      'fa-sort-up': sort === column.toLowerCase() && !order,
                      'fa-sort-down': sort
                        && order && sort === column.toLowerCase(),
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      {visiblePeople.map(person => (
        <tbody
          key={person.slug}
        >
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning':
                person.slug === personId,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {getParent(person, 'mother')}
            {getParent(person, 'father')}
          </tr>
        </tbody>
      ))}
    </table>
  );
};
