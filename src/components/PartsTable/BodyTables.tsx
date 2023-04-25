import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PageRouters } from '../../types/PageRouters';
import { PersonLink } from '../Links/PersonLink';

type Props = {
  visiblePeople: Person[],
  selectedSlug: string,
};

export const BodyTables: FC<Props> = ({ visiblePeople, selectedSlug }) => (
  <tbody>
    {visiblePeople.map(({
      name,
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
    }: Person) => {
      const mother = visiblePeople
        .find(person => person.name === motherName);
      const father = visiblePeople
        .find(person => person.name === fatherName);

      return (
        <tr
          data-cy="person"
          key={slug}
          className={classNames(
            { 'has-background-warning': slug === selectedSlug },
          )}
        >
          <td>
            <Link
              to={`${PageRouters.people}/${slug}`}
              className={classNames(
                { 'has-text-danger': sex === 'f' },
              )}
            >
              {name}
            </Link>
          </td>

          <td>{sex}</td>
          <td>{born}</td>
          <td>{died}</td>

          <td>
            { mother ? (
              <PersonLink person={mother} />
            ) : (
              motherName || '-'
            )}
          </td>

          <td>
            { father ? (
              <PersonLink person={father} />
            ) : (
              fatherName || '-'
            )}
          </td>
        </tr>
      );
    })}

  </tbody>
);
