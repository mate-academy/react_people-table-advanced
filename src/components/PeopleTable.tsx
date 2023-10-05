import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SortOptions } from './SortOptions';

type PeopleTableProps = {
  people: Person[];
};

const sortOptions: { field: string; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();
  const sortFilter = searchParams.get('sort');
  const orderFilter = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map((option) => (
            <SortOptions
              key={option.field}
              {...option}
              sortFilter={sortFilter}
              orderFilter={orderFilter}
            />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <Link
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                to={`/people/${person.slug}${personSlug === person.slug
                  ? ''
                  : `?${searchParams.toString()}`}`}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  className="has-text-danger"
                  to={`${person.mother.slug}?${searchParams.toString()}`}
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={`${person.father.slug}?${searchParams.toString()}`}>
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
