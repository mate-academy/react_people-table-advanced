import classNames from 'classnames';
import { Person } from '../types';
import { CustomLink } from './CustomLink';
import { SexTypes } from '../types/SexTypes';

const EMPTY = '-';

type Props = {
  person: Person;
  selectedPerson: string;
};
export const Individual: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    name,
    sex,
    slug,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>
        <CustomLink name={name} sex={sex} slug={slug} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherName ? (
        <td>
          <CustomLink
            name={motherName}
            sex={SexTypes.female}
            slug={mother?.slug}
          />
        </td>
      ) : (
        <td>{EMPTY}</td>
      )}
      {fatherName ? (
        <td>
          <CustomLink
            name={fatherName}
            sex={SexTypes.male}
            slug={father?.slug}
          />
        </td>
      ) : (
        <td>{EMPTY}</td>
      )}
    </tr>
  );
};
