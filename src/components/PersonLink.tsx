import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  personLink: Person;
  people: Person[];
};

export const PersonLink = ({ personLink, people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const names = people.map(person => person.name);

  const slugMother = people
    .find(person => personLink.motherName?.includes(person.name))?.slug;
  const slugFather = people
    .find(person => personLink.fatherName?.includes(person.name))?.slug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personLink.slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${personLink.slug}?${searchParams.toString()}`}
          className={cn({
            'has-text-danger': personLink.sex === 'f',
          })}
        >
          {personLink.name}
        </NavLink>

      </td>

      <td>{personLink.sex}</td>
      <td>{personLink.born}</td>
      <td>{personLink.died}</td>
      <td>
        {names.find(name => personLink.motherName?.includes(name))
          ? (
            <NavLink
              to={`/people/${slugMother}`}
              className="has-text-danger"
            >
              {personLink.motherName}
            </NavLink>
          ) : (
            personLink.motherName || '-'
          )}

      </td>
      <td>
        {names.find(name => personLink.fatherName?.includes(name))
          ? (
            <NavLink
              to={`/people/${slugFather}`}
            >
              {personLink.fatherName}
            </NavLink>
          ) : (
            personLink.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
