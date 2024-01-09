import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[] | null;
};

export const People: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tbody>
      {people?.map(human => {
        const fatherLink
          = people.find(p => p.name === human.fatherName)?.slug;
        const motherLink
          = people.find(p => p.name === human.motherName)?.slug;

        return (
          <tr
            data-cy="person"
            className={human.slug === slug ? 'has-background-warning' : ''}
            key={human.slug}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${human.slug}`,
                  search: searchParams.toString(),
                }}
                className={human.sex === 'f' ? 'has-text-danger' : ''}
              >
                {human.name}
              </Link>
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              {motherLink ? (
                <Link
                  to={{
                    pathname: `/people/${motherLink}`,
                    search: searchParams.toString(),
                  }}
                  className="has-text-danger"
                >
                  {human.motherName}
                </Link>
              ) : (
                `${human.motherName !== null ? human.motherName : '-'}`
              )}
            </td>
            <td>
              {fatherLink ? (
                <Link
                  to={{
                    pathname: `/people/${fatherLink}`,
                    search: searchParams.toString(),
                  }}
                >
                  {human.fatherName}
                </Link>
              ) : (
                `${human.fatherName !== null ? human.fatherName : '-'}`
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
