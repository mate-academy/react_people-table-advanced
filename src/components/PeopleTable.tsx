import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortOrders } from '../types/SortOrder';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const { slug } = useParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOrders).map(column => {
            const normalizedOrder = column[0].toUpperCase() + column.slice(1);
            const newSort = sort === column && order === 'desc'
              ? null : column;

            let newOrder = null;

            if (sort === column) {
              if (order !== 'desc') {
                newOrder = 'desc';
              } else {
                newOrder = null;
              }
            }

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {normalizedOrder}
                  <SearchLink
                    params={{
                      sort: newSort,
                      order: newOrder,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== column,
                          'fa-sort-up': sort === column && order !== 'desc',
                          'fa-sort-down': sort === column && order === 'desc',
                        })}
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
        {people.map(person => {
          const father = people.find(human => human.name === person.fatherName);
          const mother = people.find(human => human.name === person.motherName);

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
