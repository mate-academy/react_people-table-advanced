import { Link, useParams, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isThePersonSelected })}
    >
      <td>
        <Link
          to={{
            pathname: `../${slug}`,
            search: searchParams.toString(),
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
