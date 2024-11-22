import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { GetPersonDates } from '../services/getPersonDates';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, slug, motherName, fatherName } = person;

  const MOTHER_NAME = motherName;
  const FATHER_NAME = fatherName;

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const onlySlug = pathname.split('/').slice(2).join();

  const mother = person.motherName ? person.motherName : '-';
  const father = person.fatherName ? person.fatherName : '-';

  const motherDates = GetPersonDates(MOTHER_NAME, 'mother');
  const fatherDates = GetPersonDates(FATHER_NAME, 'father');

  return (
    <>
      <tr
        data-cy="person"
        className={classNames('', {
          'has-background-warning': onlySlug === slug,
        })}
      >
        <td>
          <Link
            to={{
              pathname: `/people/${slug}`,
              search: searchParams.toString(),
            }}
            className={classNames('', {
              'has-text-danger': sex === 'f',
            })}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {motherDates ? (
            <Link
              to={{
                pathname: `/people/${motherDates}`,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
            >
              {mother}
            </Link>
          ) : (
            mother
          )}
        </td>
        <td>
          {fatherDates ? (
            <Link
              to={{
                pathname: `/people/${fatherDates}`,
                search: searchParams.toString(),
              }}
            >
              {father}
            </Link>
          ) : (
            father
          )}
        </td>
      </tr>
    </>
  );
};
