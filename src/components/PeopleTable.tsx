import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { SortTable } from './SortTable';
import { arrayOfSortType } from '../utils/constants';

type PeopleTableProps = {
  people: Person[],
  sort: string,
  order: string
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sort,
  order,
}) => {
  const params = useParams();
  const selected = params.slug ? params.slug : '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {arrayOfSortType.map(type => (
            <SortTable
              key={type}
              type={type}
              sort={sort}
              order={order}
            />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': selected === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
                onClick={() => selected === person.slug}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother?.slug ? (
                <Link
                  to={`/people/${person.mother?.slug}`}
                  className={cn({
                    'has-text-danger': person.motherName,
                  })}
                  onClick={() => selected === person.mother?.slug}
                >
                  {person.mother.name}
                </Link>
              ) : (
                <p>{person.motherName ? person.motherName : '-'}</p>
              )}
            </td>
            <td>
              {person.father?.slug ? (
                <Link
                  to={`/people/${person.father?.slug}`}
                  onClick={() => selected === person.father?.slug}
                >
                  {person.father.name}
                </Link>
              ) : (
                <p>{person.fatherName ? person.fatherName : '-'}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
