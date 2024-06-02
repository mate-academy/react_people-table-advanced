import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[];
  handleAddParams: (param: string) => void;
};

const sortParams: string[] = ['name', 'sex', 'born', 'died'];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, handleAddParams }) => {
  const { currSlug } = useParams();
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order') || null;
  const sortType = searchParams.get('sort') || null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortParams.map(param => {
            const normParam = param.charAt(0).toUpperCase() + param.slice(1);

            return (
              <th key={param}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {normParam}
                  <a onClick={() => handleAddParams(param)}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sortType !== param,
                          'fa-sort-up': !order && sortType === param,
                          'fa-sort-down': order && sortType === param,
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(
          ({ slug, name, sex, fatherName, motherName, born, died }) => {
            const mother = people.find(person => person.name === motherName);
            const father = people.find(person => person.name === fatherName);

            return (
              <tr
                data-cy="person"
                key={slug}
                className={cn({
                  'has-background-warning': currSlug === slug,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `../${slug}`,
                      search: searchParams.toString(),
                    }}
                    className={cn({ 'has-text-danger': sex === 'f' })}
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
                      className="has-text-danger"
                      to={{
                        pathname: `../${mother.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {mother.name}
                    </Link>
                  ) : (
                    motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <Link
                      to={{
                        pathname: `../${father.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {father.name}
                    </Link>
                  ) : (
                    fatherName || '-'
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
