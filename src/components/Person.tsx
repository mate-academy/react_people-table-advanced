import { Person } from '../types';

export const PersonLink = ({
  person,
  people,
  focusedSlug,
  onSelect,
}: {
  person: Person;
  people: Person[];
  focusedSlug: string | null;
  onSelect: (slug: string | null) => void;
}) => {
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={focusedSlug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          onClick={() => onSelect(person.slug)}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <a
            href={`#/people/${mother.slug}`}
            onClick={() => onSelect(mother.slug)}
            className="has-text-danger"
          >
            {person.motherName}
          </a>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <a
            href={`#/people/${father.slug}`}
            onClick={() => onSelect(father.slug)}
          >
            {person.fatherName}
          </a>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
