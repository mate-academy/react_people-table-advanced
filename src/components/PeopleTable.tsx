import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Prop = {
  people: Person[]
};

export const PeopleTable:React.FC<Prop> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();
  const tableSortingNames = ['Name', 'Sex', 'Born', 'Died'];
  const { slug } = useParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const personLink = (name: string | null) => {
    const foundPerson = people.find(person => person.name === name);

    return foundPerson ? foundPerson.slug : null;
  };

  const sortedPeople = () => {
    switch (true) {
      case (sort && !order):
        if (sort === 'born' || sort === 'died') {
          return people.sort((a, b) => a[sort] - b[sort]);
        }

        if (sort === 'name' || sort === 'sex') {
          return people.sort((a, b) => a[sort].localeCompare(b[sort]));
        }

        break;

      case (sort && order === 'desc'):
        if (sort === 'born' || sort === 'died') {
          return people.sort((a, b) => b[sort] - a[sort]);
        }

        if (sort === 'name' || sort === 'sex') {
          return people.sort((a, b) => b[sort].localeCompare(a[sort]));
        }

        break;
      default: return people;
    }

    return people;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortingNames.map(tableName => (
            <th
              key={tableName}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {tableName}
                <SearchLink
                  params={{
                    sort: sort === tableName.toLowerCase() && order
                      ? null
                      : tableName.toLowerCase(),
                    order: !order && sort === tableName.toLowerCase()
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        'fa-sort',
                        {
                          'fa-sort-up':
                            sort === tableName.toLowerCase()
                              && !order,
                        },
                        {
                          'fa-sort-down':
                            sort === tableName.toLowerCase()
                              && order === 'desc',
                        },
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople().map(({
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug: link,
        }) => (
          <tr
            key={name}
            data-cy="person"
            className={cn(
              { 'has-background-warning': slug === link },
            )}
          >
            <td>
              <Link
                to={`/people/${link}`}
                className={cn(
                  { 'has-text-danger': sex === 'f' },
                )}
              >
                {name}
              </Link>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            {personLink(motherName) ? (
              <td>
                <Link
                  to={`/people/${personLink(motherName)}`}
                  className="has-text-danger"
                >
                  {motherName || '-'}
                </Link>
              </td>
            ) : (
              <td>
                {motherName || (
                  '-'
                )}
              </td>
            )}
            {personLink(fatherName) ? (
              <td>
                <Link
                  to={`/people/${personLink(fatherName)}`}
                >
                  {fatherName || '-'}
                </Link>
              </td>
            ) : (
              <td>
                {fatherName || (
                  '-'
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
