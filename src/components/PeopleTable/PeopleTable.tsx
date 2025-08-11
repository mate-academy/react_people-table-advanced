/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { SortBy } from '../SortBy';

type Props = {
  people: Person[];
};

const TABLE_COLUMNS = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();
  const tableColumns = Object.entries(TABLE_COLUMNS);

  function findPersonByName(name: string) {
    return people.find(per => per.name === name);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {tableColumns.map(([key, value]) => (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SortBy field={value} />
                </span>
              </th>
            ))}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(
            ({
              name,
              sex,
              born,
              died,
              motherName,
              fatherName,
              slug: personSlug,
            }) => {
              const isSlug = personSlug === slug;
              const isDanger = sex === 'f';
              const mother = motherName ? findPersonByName(motherName) : null;
              const father = fatherName ? findPersonByName(fatherName) : null;

              return (
                <tr
                  data-cy="person"
                  key={personSlug}
                  className={cn({
                    'has-background-warning': isSlug,
                  })}
                >
                  <td>
                    <Link
                      to={`${personSlug}?${searchParamsString}`}
                      className={cn({
                        'has-text-danger': isDanger,
                      })}
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
                        to={`${mother.slug}?${searchParamsString}`}
                        className="has-text-danger"
                      >
                        {motherName}
                      </Link>
                    ) : motherName ? (
                      motherName
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link to={`${father.slug}?${searchParamsString}`}>
                        {fatherName}
                      </Link>
                    ) : fatherName ? (
                      fatherName
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </table>
  );
};
