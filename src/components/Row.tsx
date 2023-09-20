import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
  // onSelectPerson: (slug: string) => void
  // isSelected: boolean
  motherSlug?: string
  fatherSlug?: string
};

export const Row: React.FC<Props> = ({
  person,
  // onSelectPerson,
  // isSelected,
  motherSlug,
  fatherSlug,
}) => {
  const {
    slug,
    motherName,
    sex,
    born,
    died,
    name,
    fatherName,
  } = person;

  const { userSlug } = useParams();
  const selectedUserSlug = userSlug;
  // const [searchParams] = useSearchParams();

  // console.log(selectedUserSlug);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedUserSlug,
      })}
    >
      <td>
        <Link
          // onClick={() => onSelectPerson(slug)}
          to={`./${slug}`}
          // to={{ pathname: `./${slug}`, search: searchParams.toString() }}
          className={classNames({ 'has-text-danger': motherSlug })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={`./${slug}`}
              className={classNames({ 'has-text-danger': motherSlug })}
              // onClick={() => motherSlug && onSelectPerson(motherSlug)}
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {fatherSlug
          ? (
            <Link
              to={`./${slug}`}
              // onClick={() => fatherSlug && onSelectPerson(fatherSlug)}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
