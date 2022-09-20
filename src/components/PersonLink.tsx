import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  person: Person,
  onMotherFind: (motherName?: string) => Person | undefined,
  onFatherFind: (fatherName?: string) => Person | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  onMotherFind,
  onFatherFind,
}) => {
  const [searchParams] = useSearchParams();
  const motherAsPerson = onMotherFind(person.motherName || undefined);
  const fatherAsPerson = onFatherFind(person.fatherName || undefined);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={
        searchParams.toString().includes(person.slug)
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <Link
          to={{
            search: getSearchWith(searchParams, { slug: person.slug})
          }}
          className={
            person.sex === 'f'
              ? 'has-text-danger'
              : ''
          }
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {motherAsPerson
        ? (
          <td>
            <Link
              to={{
                search: getSearchWith(searchParams,
                  { slug: motherAsPerson.slug})
              }}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          </td>
        ) : <td>{person.motherName || '-'}</td>}

      {fatherAsPerson
        ? (
          <td>
            <Link 
              to={{
                search: getSearchWith(searchParams,
                  { slug: fatherAsPerson.slug })
              }}
            >
              {person.fatherName}
            </Link>
          </td>
        ) : <td>{person.fatherName || '-'}</td>}
    </tr>
  );
};
