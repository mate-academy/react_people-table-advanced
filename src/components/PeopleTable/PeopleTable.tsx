import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { getHuman } from '../../utils/getHuman';

import { OPTIONAL_TITLE } from '../../Constants';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearcLink';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
};

export const PeopleTable: FC<Props> = ({ people, sort, order }) => {
  const { slug } = useParams();
  const selectedPerson = slug;

  const renderHuman = (humanName: string | null) => {
    const human = getHuman(humanName, people);

    if (!human) {
      return '-';
    }

    if (typeof human !== 'string') {
      return <PersonLink person={human} />;
    }

    return humanName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {OPTIONAL_TITLE.map(title => {
            const column = title.toLowerCase();
            const isSortByAsc = column === sort && !order;
            const isSortByDesc = column === sort && order;
            const params = {
              sort: isSortByDesc ? null : column,
              order: isSortByAsc ? 'desc' : null,
            };
            const isColumnSelected = sort === column;

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i
                        className={cn({
                          'fas fa-sort': !isColumnSelected,
                          'fas fa-sort-up': isColumnSelected && !order,
                          'fas fa-sort-down':
                            isColumnSelected && order === 'desc',
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderHuman(person.motherName)}</td>
            <td>{renderHuman(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
