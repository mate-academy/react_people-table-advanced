import { Person } from '../types';
import cn from 'classnames';
import PersonLink from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const sortableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
  allPeople: Person[];
};

export const PeopleTable = ({ people, sort, order, allPeople }: Props) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const isOrdered = order === 'desc';

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return isOrdered ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getNextSort = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!isOrdered) {
      return { sort: field, order: 'desc' };
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
          {sortableColumns.map(({ title, field }) => (
            <th key={field}>
              {title}{' '}
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(searchParams, getNextSort(field)),
                }}
              >
                <i className={`fas ${getSortIcon(field)}`} />
              </Link>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = allPeople.find(
            candidate => candidate.name === person.motherName,
          );

          const father = allPeople.find(
            candidate => candidate.name === person.fatherName,
          );

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
                  (person.motherName ?? '-')
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
