import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeader } from './TableHeader';

interface Props {
  people: Person[]
}

const Headers = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: FC<Props> = ({ people }) => {
  const { peopleSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Headers.map(name => (
            <TableHeader name={name} key={name} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            mother,
            father,
            slug,
            motherName,
            fatherName,
          } = person;

          const selectedTodo = peopleSlug === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': selectedTodo })}
            >
              <td>
                <PersonLink
                  sex={sex}
                  slug={slug}
                  name={name}
                />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {
                  mother
                    ? (
                      <PersonLink
                        sex={mother.sex}
                        slug={mother.slug}
                        name={mother.name}
                      />
                    )
                    : motherName || '-'
                }
              </td>
              <td>
                {
                  father
                    ? (
                      <PersonLink
                        sex={father.sex}
                        slug={father.slug}
                        name={father.name}
                      />
                    )
                    : fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
