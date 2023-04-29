import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  slug:string
};

export const PersonInfo: React.FC<Props> = ({ person, slug }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const isSelectedPerson = (personSlug: string) => personSlug === slug;
  const {
    name,
    sex,
    born,
    died,
    motherName,
    mother,
    father,
    fatherName,
    slug: personSlug,
  } = person;

  const mom = motherName || '-';
  const dad = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelectedPerson(personSlug),
      })}
    >
      <td>
        <Link
          to={{
            pathname: isSelectedPerson(personSlug)
              ? parentPath : parentPath + personSlug,
            search: location.search,
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={{
              pathname: isSelectedPerson(mother.slug)
                ? parentPath : parentPath + mother.slug,
              search: location.search,
            }}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          mom
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`../${father.slug}`}
          >
            {father.name}
          </Link>
        ) : (
          dad
        )}
      </td>
    </tr>
  );
};
