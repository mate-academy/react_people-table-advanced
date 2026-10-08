import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  // console.log(slug);

  return (
    <tbody>
      {people.map(person => (
        <tr
          className={classNames({
            'has-background-warning': person.slug === slug,
          })}
          key={person.slug}
          data-cy="person"
        >
          <td>
            <a
              className={classNames({ 'has-text-danger': person.sex === 'f' })}
              href={`#/people/${person.slug}`}
            >
              {person.name}
            </a>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother ? (
              <PersonLink person={person.mother} />
            ) : (
              person.motherName || '-'
            )}
          </td>
          <td>
            {person.father ? (
              <PersonLink person={person.father} />
            ) : (
              person.fatherName || '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
