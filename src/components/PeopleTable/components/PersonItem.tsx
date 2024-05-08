import { Link, useLocation, useParams } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isThePersonSelected })}
    >
      <td>
        <Link
          to={{
            pathname: `../${slug}`,
            search: location.search,
          }}
          replace
          className={getTheClassName(person)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherSlug ? (
          <Link
            to={{
              pathname: `../${motherSlug}`,
              search: location.search,
            }}
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
          <Link
            to={{
              pathname: `../${fatherSlug}`,
              search: location.search,
            }}
            replace={true}
          >
            {normalizedFatherName}
          </Link>
        ) : (
          normalizedFatherName
        )}
      </td>
    </tr>
  );
};
