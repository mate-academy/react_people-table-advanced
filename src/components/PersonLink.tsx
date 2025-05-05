import { FC } from 'react';
import { Person } from '../types';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { FilterGender } from '../types/Gender';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, born, died, father, slug, mother } = person;
  const classSex = (gender: FilterGender | '') =>
    gender === 'f' ? 'has-text-danger' : '';
  const { search } = useLocation();
  const { slugName } = useParams();

  const activePersonClass = (newPerson: Person): string =>
    newPerson.slug === slugName ? 'has-background-warning' : '';

  return (
    <tr data-cy="person" key={slug} className={activePersonClass(person)}>
      <td>
        <NavLink
          to={{
            pathname: `${slug}`,
            search,
          }}
          className={classSex(sex as FilterGender)}
        >
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother?.slug ? (
        <td>
          <NavLink
            className={classSex(mother.sex as FilterGender)}
            to={{ pathname: `${mother.slug}`, search }}
          >
            {mother.name}
          </NavLink>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father?.slug ? (
        <td>
          <NavLink
            className={classSex(father.sex as FilterGender)}
            to={{ pathname: `${father.slug}`, search }}
          >
            {father.name}
          </NavLink>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
