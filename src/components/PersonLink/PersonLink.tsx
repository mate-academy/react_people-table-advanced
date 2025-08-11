import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { FilterType } from '../../types/FilterType';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams();

  const motherNameAsPerson: Person | undefined = people.find(
    man => man.name === motherName,
  );

  const fatherNameAsPerson: Person | undefined = people.find(
    man => man.name === fatherName,
  );

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': slug === person.slug,
        })}
      >
        <td>
          <Link
            to={{
              pathname: `/people/${person.slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({
              'has-text-danger': sex === FilterType.FEMALE,
            })}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>

        <td>
          {!motherNameAsPerson ? (
            motherName || '-'
          ) : (
            <Link
              to={{
                pathname: `/people/${motherNameAsPerson?.slug}`,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )}
        </td>

        <td>
          {!fatherNameAsPerson ? (
            fatherName || '-'
          ) : (
            <Link
              to={{
                pathname: `/people/${fatherNameAsPerson?.slug}`,
                search: searchParams.toString(),
              }}
            >
              {fatherName}
            </Link>
          )}
        </td>
      </tr>
    </>
  );
};
