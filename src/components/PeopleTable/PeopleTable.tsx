import { FC } from 'react';
import { usePeople } from '../../providers/PeopleProvider';
import { PersonPage } from '../PersonPage/PersonPage';
import classNames from 'classnames';
import { Person } from '../../types';

export const PeopleTable: FC = () => {
  const { people, activePerson } = usePeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((p: Person) => {
          return (
            <tr
              key={p.slug}
              className={classNames({
                'has-background-warning': p.slug === activePerson?.slug,
              })}
              data-cy="person"
            >
              <td className="has-text-danger">
                <PersonPage person={p} />
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {p.mother ? (
                  <PersonPage person={p.mother} />
                ) : (
                  p.motherName || '-'
                )}
              </td>
              <td>
                {p.father ? (
                  <PersonPage person={p.father} />
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
