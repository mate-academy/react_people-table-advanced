import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PeopleRow: FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug: slugParam } = useParams();

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': slug === slugParam,
      })}
    >
      <td aria-label="Person">
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td aria-label="Mother">
        {mother
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>
      <td aria-label="Father">
        {father
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
