import { FC } from 'react';
import { Person } from '../types';
import { NavLink, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, born, died, father, slug, mother } = person;
  const classSex = sex === 'f' ? 'has-text-danger' : '';
  const { search } = useLocation();
  const { slugName } = useParams();

  const activePersonClass = (person: Person): string =>
    person.slug === slugName ? 'has-background-warning' : '';

  return (
    <tr data-cy="person" key={slug} className={activePersonClass(person)}>
      <td>
        <NavLink
          to={{
            pathname: `${slug}`,
            search,
          }}
          className={classSex}
        >
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother?.slug ? (
        <td>
          <NavLink className={classSex} to={`${mother.slug}`}>
            {mother.name}
          </NavLink>
        </td>
      ) : (
        <td> {person.motherName || '-'}</td>
      )}

      {father?.slug ? (
        <td>
          <NavLink className={classSex} to={`${father.slug}`}>
            {father.name}
          </NavLink>
        </td>
      ) : (
        <td> {person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
