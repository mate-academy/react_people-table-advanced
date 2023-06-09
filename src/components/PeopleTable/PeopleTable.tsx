import { FC } from 'react';
import classNames from 'classnames';

import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
};

export const PeopleTable: FC<Props> = ({ people, sort, order }) => {
  const { slug: selectedSlug } = useParams();
  const isSelected = (person: Person) => person.slug === selectedSlug;
  const tHeadData = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tHeadData.map(data => {
            const lowerName = data.toLocaleLowerCase();

            return (
              <th key={data}>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                >
                  {data}
                  <SearchLink
                    params={{
                      sort: (sort === lowerName && order) ? null : lowerName,
                      order: (sort === lowerName && !order) ? 'desc' : null,
                    }}
                  >
                    <span
                      className="icon"

                    >
                      <i
                        className={classNames('fas fa-sort',
                          {
                            'fa-sort-up': (sort === lowerName
                              && !order),
                            'fa-sort-down': (sort === lowerName
                              && order),
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
        {people.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonLink person={person} isSelected={isSelected} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} isSelected={isSelected} />
                : person.motherName}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} isSelected={isSelected} />
                : person.fatherName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
