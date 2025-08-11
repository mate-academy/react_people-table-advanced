import { FC } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { getPeopleSorted } from '../utils/getPeopleSorted';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const selectedPerson = people.find(person => person.slug === slug);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortedPeopleByCriteria = getPeopleSorted(people, sort, order);

  const SortedOrder = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SortedOrder.map(sortOrder => {
            const column = sortOrder.toLowerCase();

            const isSortByAsc = column === sort && !order;
            const isSortByDesc = column === sort && order;

            const params = {
              sort: isSortByDesc ? null : column,
              order: isSortByAsc ? 'desc' : null,
            };

            return (
              <th key={sortOrder}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortOrder}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== column,
                          'fa-sort-up': sort === column && !order,
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
        {sortedPeopleByCriteria.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: slugPerson,
            mother,
            father,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selectedPerson?.slug === slugPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>

              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
