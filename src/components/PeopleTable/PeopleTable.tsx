import cn from 'classnames';
import { FC, memo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[];
  selectedPersonSlug: string;
};

export const PeopleTable: FC<Props> = memo(({
  people,
  selectedPersonSlug,
}) => {
  if (!people.length) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || ('-')}
            </td>

            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || ('-')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
