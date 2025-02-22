import { FC } from 'react';
import { usePeople } from '../providers/PeopleProvider';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SortLink } from './SortLink';

export const PeopleTable: FC = () => {
  const { people, activePerson } = usePeople();

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
              <SortLink sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => (
          <tr
            key={p.slug}
            className={classNames({
              'has-background-warning': p.slug === activePerson?.slug,
            })}
            data-cy="person"
          >
            <td className="has-text-danger">
              <PersonLink person={p} />
            </td>

            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                <PersonLink person={p.mother} />
              ) : (
                p.motherName || '-'
              )}
            </td>
            <td>
              {p.father ? (
                <PersonLink person={p.father} />
              ) : (
                p.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
