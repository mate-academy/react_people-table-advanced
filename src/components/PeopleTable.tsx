import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortBy } from '../types/SortBy';

type Props = {
  people: Person[];
};

const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  const isReversed: number = order ? -1 : 1;

  return [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return (a[sort] as string).localeCompare(b[sort]) * isReversed;
      case 'born':
      case 'died':
        return (+a[sort] - +b[sort]) * isReversed;
      default:
        return 0;
    }
  });
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortedPeople: Person[] = sortPeople(people, sort, order);

  const sortByColumn = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(SortBy).map((sortName: string) => (
            <th key={sortName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortName}
                <Link to={{
                  search: getSearchWith(
                    searchParams,
                    sortByColumn(sortName.toLowerCase()),
                  ),
                }}
                >
                  <span className="icon">
                    <i className={cn('fas fa-sort', {
                      'fa-sort-up': sort === sortName.toLowerCase() && !order,
                      'fa-sort-down': sort === sortName.toLowerCase() && order,
                    })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person: Person) => {
          const mother = people
            .find(person2 => person.motherName === person2.name);
          const father = people
            .find(person2 => person.fatherName === person2.name);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
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
                {mother ? (
                  <PersonLink person={mother} />
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
