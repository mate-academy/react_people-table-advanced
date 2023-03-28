import classNames from 'classnames';
import { FC } from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { SortLink } from '../SortLink';
import { SortType } from '../../enums/SortType';
import { getSortType } from '../../helpers/getSortType';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPersonSlug = '' }) => {
  const isSelected = ({ slug }: Person) => slug === selectedPersonSlug;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {[...Object.keys(SortType)]
            .filter((type) => type.toLowerCase() !== SortType.None)
            .map((typeTitle) => (
              <th key={typeTitle}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {typeTitle}
                  <SortLink
                    initialSortType={getSortType(typeTitle.toLowerCase())}
                  />
                </span>
              </th>
            ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const {
            sex,
            born,
            slug,
            died,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected(person),
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
