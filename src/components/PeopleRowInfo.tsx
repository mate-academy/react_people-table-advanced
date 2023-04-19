import { useParams } from 'react-router-dom';

import classNames from 'classnames';

import { Person } from '../types';

import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PeopleRowInfo: React.FC<Props> = ({
  person,
}) => {
  const {
    sex, born, died, fatherName, motherName, slug, mother, father,
  } = person;

  const { slug: selectedSlug = '' } = useParams();

  return (
    <tr
      className={classNames({
        'has-background-warning': slug === selectedSlug,
      })}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
