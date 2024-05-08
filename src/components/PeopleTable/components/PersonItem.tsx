import { Link, useParams } from 'react-router-dom';
import { Person } from '../../../types';
import classNames from 'classnames';
import { getTheClassName, getTheParentName } from '../../../utils/util';

type Props = { person: Person };

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;
  const normalizedMotherName = getTheParentName(motherName);
  const normalizedFatherName = getTheParentName(fatherName);

  const { slug: currentSlug } = useParams();
  const isThePersonSelected = person.slug === currentSlug;
  const motherSlug = mother?.slug;
  const fatherSlug = father?.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isThePersonSelected })}
    >
      <td>
        {isThePersonSelected ? (
          <Link to={`..`} replace className={getTheClassName(person)}>
            {name}
          </Link>
        ) : (
          <Link to={`../${slug}`} replace className={getTheClassName(person)}>
            {name}
          </Link>
        )}
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherSlug ? (
          <Link
            to={`../${motherSlug}`}
            replace={true}
            className="has-text-danger"
          >
            {normalizedMotherName}
          </Link>
        ) : (
          normalizedMotherName
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`../${fatherSlug}`} replace={true}>
            {normalizedFatherName}
          </Link>
        ) : (
          normalizedFatherName
        )}
      </td>
    </tr>
  );
};
