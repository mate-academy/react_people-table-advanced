import { FC } from 'react';
import { Props } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const handleNextSortParams = (field: string) => {
    const currField = searchParams.get('sort');
    const currOrder = searchParams.get('order');
    const isActive = currField === field;
    let nextOrder: 'asc' | 'desc' | null;
    let nextSort: string | null = field;

    if (isActive) {
      if (currOrder === 'asc') {
        nextOrder = 'desc';
      } else {
        nextOrder = null;
        nextSort = null;
      }
    } else {
      nextOrder = 'asc';
    }

    return { sort: nextSort, order: nextOrder };
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={handleNextSortParams(field)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': searchParams.get('sort') !== field,
                        'fa-sort-up':
                          searchParams.get('sort') === field &&
                          searchParams.get('order') === 'asc',
                        'fa-sort-down':
                          searchParams.get('sort') === field &&
                          searchParams.get('order') === 'desc',
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

      <tbody>
        {people.map(person => {
          const personMother = people.find(m => m.name === person.motherName);
          const personFather = people.find(f => f.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {personMother ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${personMother.slug}`}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <Link to={`/people/${personFather.slug}`}>
                    {person.fatherName}
                  </Link>
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
