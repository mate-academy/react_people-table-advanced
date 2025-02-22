import { useParams, Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SortLink } from '../utils/SortLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { humanId } = useParams();

  const isFemale = (sex: string) => sex === 'f';

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SortLink sortBy="name" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SortLink sortBy="sex" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SortLink sortBy="born" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SortLink sortBy="died" />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(human => {
            const { name, sex, born, died, fatherName, motherName, slug } =
              human;

            const mum =
              people.find(mother => mother.name === motherName) || null;

            const papa =
              people.find(father => father.name === fatherName) || null;

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning': humanId === slug,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `${slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames({
                      'has-text-danger': isFemale(sex),
                    })}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                {mum ? (
                  <td>
                    <Link
                      to={{
                        pathname: `${mum.slug}`,
                        search: searchParams.toString(),
                      }}
                      className="has-text-danger"
                    >
                      {motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{motherName || '-'}</td>
                )}
                {papa ? (
                  <td>
                    <Link
                      to={{
                        pathname: `${papa.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {fatherName}
                    </Link>
                  </td>
                ) : (
                  <td>{fatherName || '-'}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
