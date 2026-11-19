import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types/Person';
import { Field } from '../../types/Field';
import { Order } from '../../types/Order';

type Props = {
  people: Person[];
};

const columns = [
  { title: 'Name', field: Field.NAME },
  { title: 'Sex', field: Field.SEX },
  { title: 'Born', field: Field.BORN },
  { title: 'Died', field: Field.DIED },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function getNextParams(field: string) {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: Order.DESC };
    }

    return { sort: null, order: null };
  }

  function getIconClass(field: string) {
    if (sort === field && !order) {
      return 'fa-sort-up';
    }

    if (sort === field && order === Order.DESC) {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {people.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <>
          <thead>
            <tr>
              {columns.map(column => {
                return (
                  <th key={column.field}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {column.title}
                      <SearchLink params={getNextParams(column.field)}>
                        <span className="icon">
                          <i
                            className={cn('fas', getIconClass(column.field))}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                );
              })}

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
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};
