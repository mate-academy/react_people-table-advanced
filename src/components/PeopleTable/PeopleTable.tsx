import cn from 'classnames';
import { FC, memo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[];
  selectedPerson: string | number;
};

export const PeopleTable: FC<Props> = memo(({
  people,
  selectedPerson,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SortLink currentColumnName="name" />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SortLink currentColumnName="sex" />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SortLink currentColumnName="born" />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SortLink currentColumnName="died" />
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => {
        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              // eslint-disable-next-line
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.mother
              ? (
                <td>
                  <PersonLink
                    person={person.mother}
                  />
                </td>
              )
              : (
                <td>{person.motherName || ('-')}</td>
              )}

            {person.father
              ? (
                <td>
                  <PersonLink
                    person={person.father}
                  />
                </td>
              )
              : (
                <td>{person.fatherName || ('-')}</td>
              )}
          </tr>
        );
      })}
    </tbody>
  </table>
));
