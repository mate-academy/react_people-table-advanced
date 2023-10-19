import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { OrderControl } from '../utils/OrderControl';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function getPersonByName(name: string) {
    return people.find((person) => person.name === name);
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
              <OrderControl sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <OrderControl sort="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <OrderControl sort="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <OrderControl sort="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            motherName,
            fatherName,
            sex,
            born,
            died,
          } = person;

          const mother = motherName ? getPersonByName(motherName)
            : undefined;
          const father = fatherName ? getPersonByName(fatherName)
            : undefined;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                cn(
                  {
                    'has-background-warning':
                            slug === person.slug,
                  },
                )
              }
            >

              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {(motherName
                    && (mother ? <PersonLink person={mother} /> : motherName))
                    || '-'}
              </td>

              <td>
                {(fatherName
                    && (father ? <PersonLink person={father} /> : fatherName))
                    || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
