import { useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PeopleLink';

type Props = {
  people: Person[];
};

export const Table: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const isSelected = people.find(person => person.slug === slug);

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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: personSlug,
            mother,
            father,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': isSelected?.slug === personSlug,
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
