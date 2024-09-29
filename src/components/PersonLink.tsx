import classNames from 'classnames';
import { Person } from '../types';
import { Sex } from '../types/SexType';

type Props = {
  person: Person;
  slugId?: string;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  },
  slugId,
}) => {
  return (
    <tr
      key={name}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugId,
      })}
    >
      <td>
        <a
          className={classNames({
            'has-text-danger': sex === Sex.Female,
          })}
          href={`#/people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <a
            className={classNames({
              'has-text-danger': mother.sex === Sex.Female,
            })}
            href={`#/people/${mother.slug}`}
          >
            {motherName}
          </a>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <a href={`#/people/${father.slug}`}>{fatherName}</a>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
